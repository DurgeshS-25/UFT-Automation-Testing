' Action 1: Read Excel Data, Populate Global Table, and Login

' Restrict this script to execute only once
If DataTable.GetCurrentRow > 1 Then
    ExitAction ' Stop execution after the first row
End If

' Define Excel file path
Const excelPath = "C:\Users\durge\Desktop\INFO6225\FlightData.xlsx"

' Ensure Global Data Table exists
If DataTable.GetSheet("Global") Is Nothing Then
    DataTable.AddSheet("Global") ' Create the Global Data Table
End If

' Add necessary columns to the Global Data Table
DataTable.GetSheet("Global").AddParameter "AgentName", ""
DataTable.GetSheet("Global").AddParameter "Password", ""
DataTable.GetSheet("Global").AddParameter "FromCity", ""
DataTable.GetSheet("Global").AddParameter "ToCity", ""
DataTable.GetSheet("Global").AddParameter "Date", ""
DataTable.GetSheet("Global").AddParameter "Class", ""
DataTable.GetSheet("Global").AddParameter "Passengers", ""
DataTable.GetSheet("Global").AddParameter "PassengerName", ""

' Step 1: Open Excel file and read data
Dim objExcel, objWorkbook, objSheet, rowCount, i

' Open Excel file
Set objExcel = CreateObject("Excel.Application")
Set objWorkbook = objExcel.Workbooks.Open(excelPath) ' Open the specified file
Set objSheet = objWorkbook.Sheets("Sheet1") ' Ensure the sheet name matches

' Get number of rows in the Excel file
rowCount = objSheet.UsedRange.Rows.Count

' Populate the Global Data Table
For i = 2 To rowCount ' Start from row 2 (row 1 is the header)
    DataTable.SetCurrentRow(i - 1)
    DataTable.Value("AgentName", dtGlobalSheet) = objSheet.Cells(i, 1).Value
    DataTable.Value("Password", dtGlobalSheet) = objSheet.Cells(i, 2).Value
    DataTable.Value("FromCity", dtGlobalSheet) = objSheet.Cells(i, 3).Value
    DataTable.Value("ToCity", dtGlobalSheet) = objSheet.Cells(i, 4).Value
    DataTable.Value("Date", dtGlobalSheet) = objSheet.Cells(i, 5).Text ' Read date as text for accuracy
    DataTable.Value("Class", dtGlobalSheet) = objSheet.Cells(i, 6).Value
    DataTable.Value("Passengers", dtGlobalSheet) = objSheet.Cells(i, 7).Value
    DataTable.Value("PassengerName", dtGlobalSheet) = objSheet.Cells(i, 8).Value
Next

' Close Excel file
objWorkbook.Close False
objExcel.Quit

' Cleanup
Set objSheet = Nothing
Set objWorkbook = Nothing
Set objExcel = Nothing

' Confirming successful data import
Reporter.ReportEvent micPass, "Data Import", "Data successfully imported into the Global Data Table."

' Checking	 if the application is already open, open it only if it is not
If Not WpfWindow("OpenText MyFlight Sample").Exist(5) Then
    SystemUtil.Run "C:\Program Files (x86)\OpenText\UFT One\samples\Flights Application\FlightsGUI.exe"
End If

' Login using the first row of the Global Data Table
DataTable.SetCurrentRow(1) ' Set to the first row for login
agentName = DataTable.Value("AgentName", dtGlobalSheet)
password = DataTable.Value("Password", dtGlobalSheet)

' Perform login
WpfWindow("OpenText MyFlight Sample").WpfEdit("agentName").Set agentName
WpfWindow("OpenText MyFlight Sample").WpfEdit("password").SetSecure password
WpfWindow("OpenText MyFlight Sample").WpfButton("OK").Click

' Add a checkpoint to validate successful login
If WpfWindow("OpenText MyFlight Sample").Exist(5) Then
    Reporter.ReportEvent micPass, "Login Checkpoint", "Login successful for Agent: " & agentName
Else
    Reporter.ReportEvent micFail, "Login Checkpoint", "Login failed for Agent: " & agentName
    ExitAction
End If

' Stop the execution of this action
ExitAction
