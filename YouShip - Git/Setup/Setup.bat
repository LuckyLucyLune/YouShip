@echo off
echo Installing dependencies...
pip install -r requirements.txt

echo Running setup.py...
python setup.py install

echo Setup complete.
pause
