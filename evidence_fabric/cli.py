import argparse
import json
import sys
import os

from evidence_fabric.capsule import SessionCapsule, Claim, Evidence, Decision
from evidence_fabric.export import export_public, export_handoff

def load_capsule(filepath: str) -> SessionCapsule:
    with open(filepath, 'r') as f:
        data = json.load(f)
    claims = []
    for c_data in data.get('claims', []):
        evidences = [Evidence(**e) for e in c_data.get('evidence', [])]
        c_data['evidence'] = evidences
        claims.append(Claim(**c_data))
    decisions = [Decision(**d) for d in data.get('decisions', [])]
    data['claims'] = claims
    data['decisions'] = decisions
    return SessionCapsule(**data)

def main():
    parser = argparse.ArgumentParser(description="Evidence Fabric CLI")
    subparsers = parser.add_subparsers(dest="command", required=True)

    ingest_parser = subparsers.add_parser("ingest", help="Ingest a session capsule (for validation)")
    ingest_parser.add_argument("capsule", help="Path to the capsule JSON")

    export_parser = subparsers.add_parser("export", help="Export capsule artifacts")
    export_parser.add_argument("capsule", help="Path to the capsule JSON")
    export_parser.add_argument("--public", action="store_true", help="Generate public recruiter exports")
    export_parser.add_argument("--handoff", action="store_true", help="Generate handoff export")
    export_parser.add_argument("--outdir", default=".", help="Output directory")

    args = parser.parse_args()

    try:
        capsule = load_capsule(args.capsule)
    except Exception as e:
        print(f"Error loading capsule: {e}")
        sys.exit(1)

    if args.command == "ingest":
        print(f"Successfully ingested capsule: {capsule.session_id}")
    elif args.command == "export":
        if not args.public and not args.handoff:
            print("Please specify --public or --handoff (or both)")
            sys.exit(1)
        if args.public:
            export_public(capsule, args.outdir)
            print(f"Exported public artifacts to {args.outdir}")
        if args.handoff:
            export_handoff(capsule, args.outdir)
            print(f"Exported handoff artifact to {args.outdir}")

if __name__ == "__main__":
    main()
