from flask import Flask, request, jsonify
import threading
import time

app = Flask(__name__)

# Mock database to track ingestion statuses
ingestion_status = {}

@app.route('/ingest', methods=['POST'])
def trigger_ingestion():
    data = request.json
    document_id = data.get('documentId')

    if not document_id:
        return jsonify({"error": "documentId is required"}), 400

    # Simulate ingestion process
    ingestion_status[document_id] = "In Progress"

    def complete_ingestion(doc_id):
        time.sleep(10)  # Simulate processing time
        ingestion_status[doc_id] = "Completed"

    threading.Thread(target=complete_ingestion, args=(document_id,)).start()

    return jsonify({"message": f"Ingestion started for document {document_id}"}), 200

@app.route('/ingest/<int:document_id>/status', methods=['GET'])
def get_ingestion_status(document_id):
    status = ingestion_status.get(document_id, "Not Found")
    return jsonify({"documentId": document_id, "status": status}), 200

if __name__ == '__main__':
    app.run(port=8000)
