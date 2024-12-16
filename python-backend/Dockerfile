# Use Python base image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy Python requirements and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the Python backend code
COPY . .

# Expose the port
EXPOSE 8000

# Run the Flask server
CMD ["python", "app.py"]
