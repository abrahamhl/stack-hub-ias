#!/bin/bash
set -e

echo "Starting dogfood process..."
export PYTHONPATH=$(pwd)

echo "1. Ingesting good capsule..."
python evidence_fabric/cli.py ingest tests/fixtures/capsule_good.json

echo "2. Generating Public Export..."
python evidence_fabric/cli.py export tests/fixtures/capsule_good.json --public --outdir build/dogfood_public

echo "3. Generating Handoff Export..."
python evidence_fabric/cli.py export tests/fixtures/capsule_good.json --handoff --outdir build/dogfood_handoff

echo "Dogfood process complete. Artifacts in build/dogfood_*"
