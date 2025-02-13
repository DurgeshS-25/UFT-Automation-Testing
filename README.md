# 🛫 UFT One Automation Testing - Flight Booking System

## 📌 Project Overview
This project automates the **Flight Booking System** using **Micro Focus UFT One**. It follows a **Data-Driven Framework** to test multiple scenarios from an Excel file (`FlightData.xlsx`). The script logs in, fills out flight details, verifies checkpoints, captures screenshots, and generates test reports.

---

## 📂 Directory Structure
```
📁 UFT-Automation-Testing/
│── 📁 Assignment2/            # UFT One test scripts
│── 📁 Screenshots/            # Screenshots (Before/After Booking)
│── 📁 TestReport/             # Generated test reports
│── 📄 FlightData.xlsx         # Data-driven test file (Excel)
│── 📜 RunUFT.vbs              # VBScript for automated execution
│── 📜 UFT_Run_Log.txt         # Execution logs
│── 📜 README.md               # Project documentation (this file)
```

---

## ✅ Features & Requirements
- **Data-Driven Testing:** Reads test data from `FlightData.xlsx`.
- **Object Repository:** Includes manually added objects.
- **Checkpoints:**
  - ✅ **3 Pass Checkpoints:** Bitmap & Text Checkpoints.
  - ❌ **1 Fail Checkpoint:** Number of passengers = 0.
- **Automated Screenshots:** Saves **before & after** booking.
- **Test Reports:** Stored in `TestReport/` directory.
- **Windows Task Scheduler Integration:** Runs tests automatically.

---

## 🔧 Setup Instructions
### **1️⃣ Install UFT One**
Ensure **Micro Focus UFT One** is installed on your system.

### **2️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/UFT-Automation-Testing.git
cd UFT-Automation-Testing
```

### **3️⃣ Configure UFT One**
- Open **UFT One** and **enable the required add-ins** (`WPF`, `VBScript`).
- Ensure `FlightGUI.exe` is accessible at:
  ```
  C:\Program Files (x86)\OpenText\UFT One\samples\Flights Application\FlightsGUI.exe
  ```

### **4️⃣ Modify `RunUFT.vbs` if Needed**
- If UFT One is installed in a different directory, update `RunUFT.vbs` with the correct path.

---

## 🚀 Running the Test
### **1️⃣ Manual Execution**
- Open **UFT One** and load `Assignment2`.
- Click **Run** in UFT One.

### **2️⃣ Automated Execution (Windows Task Scheduler)**
To schedule the script to run automatically:
1. Open **Task Scheduler** (`taskschd.msc`).
2. Create a new task → Set action as **Run a program**.
3. Browse & select **`RunUFT.vbs`**.
4. Configure triggers (e.g., daily run).
5. Save & run.

### **3️⃣ Run from Command Line**
```cmd
cscript C:\Users\durge\Desktop\INFO6225\RunUFT.vbs
```

---

## 📊 Test Report
The test execution results are stored in:
```
📁 TestReport/
└── UFTExecutionResults.xml   # Detailed UFT One execution report
```
To view the results:
1. Open **UFT One** → **Tools** → **Test Results Viewer**.
2. Load `UFTExecutionResults.xml`.

---

## Screenshots 📸

| Passenger | Before Booking Screenshot | After Booking Screenshot |
|-----------|---------------------------|--------------------------|
| Jake      | [Before Booking](https://github.com/DurgeshS-25/UFT-Automation-Testing/blob/main/Screenshots/Before/Before_Booking_Jake_2-11-2025%208-10-03%20PM.png) | [After Booking](https://github.com/DurgeshS-25/UFT-Automation-Testing/blob/main/Screenshots/After/After_Booking_Jake_2-11-2025%208-10-03%20PM.png) |
| James     | [Before Booking](https://github.com/DurgeshS-25/UFT-Automation-Testing/blob/main/Screenshots/Before/Before_Booking_James_2-11-2025%208-09-49%20PM.png) | [After Booking](https://github.com/DurgeshS-25/UFT-Automation-Testing/blob/main/Screenshots/After/After_Booking_James_2-11-2025%208-09-49%20PM.png) |
| Neil      | [Before Booking](https://github.com/DurgeshS-25/UFT-Automation-Testing/blob/main/Screenshots/Before/Before_Booking_Neil_2-11-2025%208-10-22%20PM.png) | [After Booking](https://github.com/DurgeshS-25/UFT-Automation-Testing/blob/main/Screenshots/After/After_Booking_Neil_2-11-2025%208-10-22%20PM.png) |



---

## 🛠️ Troubleshooting
| Issue | Solution |
|-------|----------|
| **"Cannot open test or application area" error** | Ensure UFT One is running with admin privileges. |
| **"Object doesn't support method" error** | Verify the Object Repository includes manually added objects. |
| **"Windows Scheduler task not triggering"** | Check event logs (`eventvwr.msc`) for errors. |

---
