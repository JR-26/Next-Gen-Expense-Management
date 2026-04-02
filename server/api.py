from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(override=True)

# Import your existing pipelines
from PEFT_pipeline import run_model_pipeline
from crew_pipeline import run_crewai_pipeline
from model_loader import load_model

app = FastAPI(title="Expense Analytics API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global state for analysis results
analysis_results = None
model_pipe = None

@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    global model_pipe
    try:
        model_pipe = load_model()
        print("✅ Model loaded successfully")
    except Exception as e:
        print(f"❌ Error loading model: {e}")

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "message": "Expense Analytics API is running"
    }

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload and process expense file
    """
    global analysis_results
    
    try:
        # Validate file
        if not file.filename.endswith('.xlsx'):
            raise HTTPException(
                status_code=400,
                detail="Only .xlsx files are supported"
            )
        
        # Save temporary file
        upload_dir = Path("server/data/uploads")
        upload_dir.mkdir(parents=True, exist_ok=True)
        temp_path = upload_dir / file.filename
        
        with open(temp_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        # Process with AI pipeline
        categorized_json = "server/outputs/categorized.json"
        run_model_pipeline(str(temp_path), categorized_json, model_pipe)
        
        # Generate report
        final_report = run_crewai_pipeline()
        
        # Load categorized data
        with open(categorized_json, "r", encoding="utf-8") as f:
            categorized_data = json.load(f)
        
        # Store results
        analysis_results = {
            "categorized": categorized_data,
            "report": str(final_report),
            "status": "completed"
        }
        
        # Cleanup
        if temp_path.exists():
            temp_path.unlink()
        
        return {
            "status": "success",
            "message": "File processed successfully",
            "data": analysis_results
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing file: {str(e)}"
        )

@app.get("/api/results")
async def get_results():
    """
    Get analysis results
    """
    global analysis_results
    
    if analysis_results is None:
        # Load from disk if available
        try:
            categorized_json = "server/outputs/categorized.json"
            final_report = "server/outputs/final_report.txt"
            
            if os.path.exists(categorized_json):
                with open(categorized_json, "r", encoding="utf-8") as f:
                    categorized_data = json.load(f)
            else:
                categorized_data = {}
            
            if os.path.exists(final_report):
                with open(final_report, "r", encoding="utf-8") as f:
                    report_text = f.read()
            else:
                report_text = ""
            
            analysis_results = {
                "categorized": categorized_data,
                "report": report_text
            }
        except Exception as e:
            raise HTTPException(
                status_code=404,
                detail="No analysis results available"
            )
    
    return {
        "status": "success",
        "data": analysis_results
    }

@app.get("/api/summary")
async def get_summary():
    """
    Get expense summary
    """
    global analysis_results
    
    if analysis_results is None:
        raise HTTPException(status_code=404, detail="No results available")
    
    try:
        categorized = analysis_results.get("categorized", {})
        
        # Calculate summary
        total = 0
        categories = {}
        
        for item in categorized.get("expenses", []):
            amount = item.get("amount", 0)
            category = item.get("category", "Other")
            total += amount
            categories[category] = categories.get(category, 0) + amount
        
        # Get average monthly
        average_monthly = total / 6 if total > 0 else 0
        
        return {
            "status": "success",
            "data": {
                "total_expenses": total,
                "average_monthly": average_monthly,
                "categories": categories,
                "total_transactions": len(categorized.get("expenses", []))
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating summary: {str(e)}"
        )

@app.get("/api/categories")
async def get_categories():
    """
    Get detailed category breakdown
    """
    global analysis_results
    
    if analysis_results is None:
        raise HTTPException(status_code=404, detail="No results available")
    
    try:
        categorized = analysis_results.get("categorized", {})
        categories = {}
        
        for item in categorized.get("expenses", []):
            category = item.get("category", "Other")
            amount = item.get("amount", 0)
            
            if category not in categories:
                categories[category] = {
                    "total": 0,
                    "items": [],
                    "percentage": 0
                }
            
            categories[category]["total"] += amount
            categories[category]["items"].append(item)
        
        # Calculate percentages
        total = sum(cat["total"] for cat in categories.values())
        for cat in categories.values():
            cat["percentage"] = (cat["total"] / total * 100) if total > 0 else 0
        
        return {
            "status": "success",
            "data": categories
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error getting categories: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
