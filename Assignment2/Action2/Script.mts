' Path to save screenshots
Const Before = "C:\Users\durge\Desktop\INFO6225\Screenshots\Before"
Const After = "C:\Users\durge\Desktop\INFO6225\Screenshots\After"

' Initialize a flag to check if the application is already launched
Dim appLaunched
appLaunched = False

' Function to check if the application is already running
Function IsAppRunning()
    On Error Resume Next
    IsAppRunning = WpfWindow("OpenText MyFlight Sample").Exist(1)
    On Error GoTo 0
End Function

' Start the Flight GUI application only once
If Not appLaunched And Not IsAppRunning() Then
    SystemUtil.Run "C:\Program Files (x86)\OpenText\UFT One\samples\Flights Application\FlightsGUI.exe"
    appLaunched = True

    ' Log in for the first customer
    WpfWindow("OpenText MyFlight Sample").WpfEdit("agentName").Set DataTable.Value("AgentName", dtGlobalSheet)
    WpfWindow("OpenText MyFlight Sample").WpfEdit("password").SetSecure DataTable.Value("Password", dtGlobalSheet)
    WpfWindow("OpenText MyFlight Sample").WpfButton("OK").Click
End If

' Loop through all rows in the Global Data Table
For i = 1 To DataTable.GetRowCount
    DataTable.SetCurrentRow(i) ' Set the current row in the Global Data Table

    ' Fetch data dynamically from the Global Data Table
    fromCity = DataTable.Value("FromCity", dtGlobalSheet)
    toCity = DataTable.Value("ToCity", dtGlobalSheet)
    travelDate = DataTable.Value("Date", dtGlobalSheet)
    passengerName = DataTable.Value("PassengerName", dtGlobalSheet)
    flightClass = DataTable.Value("Class", dtGlobalSheet)
    numTickets = DataTable.Value("Passengers", dtGlobalSheet)

    ' Handle Passengers = 0 Fail Checkpoint
    If numTickets = 0 Then
        Reporter.ReportEvent micFail, "Invalid Passengers", "Number of passengers is 0 for customer: " & passengerName

        ' Close the application after failure
        If WpfWindow("OpenText MyFlight Sample").Exist(5) Then
            WpfWindow("OpenText MyFlight Sample").Close
            appLaunched = False
            Reporter.ReportEvent micPass, "Application Close", "Application closed after failure for customer: " & passengerName
            Wait(2) ' Wait for the application to fully close
        End If

        ' Relaunch the application for the next customer
        If i < DataTable.GetRowCount Then
            SystemUtil.Run "C:\Program Files (x86)\OpenText\UFT One\samples\Flights Application\FlightsGUI.exe"
            appLaunched = True
            Reporter.ReportEvent micPass, "Application Relaunch", "Application relaunched for the next customer."

            ' Re-login for the next customer
            DataTable.SetCurrentRow(i + 1)
            WpfWindow("OpenText MyFlight Sample").WpfEdit("agentName").Set DataTable.Value("AgentName", dtGlobalSheet)
            WpfWindow("OpenText MyFlight Sample").WpfEdit("password").SetSecure DataTable.Value("Password", dtGlobalSheet)
            WpfWindow("OpenText MyFlight Sample").WpfButton("OK").Click
        End If

        ' Skip the rest of the loop iteration
    Else
       ' Take a screenshot before filling out the booking form
	Dim timeStamp
	timeStamp = Replace(Replace(Now, "/", "-"), ":", "-")

	' Replace spaces in passengerName to avoid file naming issues
	Dim PassName
	PassName = Replace(passengerName, " ", "_")
	Desktop.CaptureBitmap Before & "\Before_Booking_" & PassName & "_" & timeStamp & ".png"
	
        ' Select flight details dynamically
        WpfWindow("OpenText MyFlight Sample").WpfComboBox("fromCity").Select fromCity
        WpfWindow("OpenText MyFlight Sample").WpfComboBox("toCity").Select toCity
        WpfWindow("OpenText MyFlight Sample").WpfCalendar("datePicker").SetDate travelDate
        WpfWindow("OpenText MyFlight Sample").WpfComboBox("Class").Select flightClass

        ' Bitmap and Text check points @@ hightlight id_;_9241738_;_script infofile_;_ZIP::ssf59.xml_;_
   	 WpfWindow("OpenText MyFlight Sample").WpfButton("FIND FLIGHTS").Check CheckPoint("FIND FLIGHTS")
	 WpfWindow("OpenText MyFlight Sample").WpfObject("Seattle to San Francisco,").Check CheckPoint("Seattle to San Francisco,  all inclusive") @@ hightlight id_;_1920020352_;_script infofile_;_ZIP::ssf76.xml_;_
	 WpfWindow("OpenText MyFlight Sample").WpfObject("John Smith").Check CheckPoint("John Smith")

        ' Select the number of tickets dynamically
        If WpfWindow("OpenText MyFlight Sample").WpfComboBox("numOfTickets").Exist(2) Then
            WpfWindow("OpenText MyFlight Sample").WpfComboBox("numOfTickets").Select numTickets
            Reporter.ReportEvent micPass, "Tickets Selection", "Tickets successfully selected: " & numTickets
        Else
            Reporter.ReportEvent micFail, "Tickets Selection", "Tickets dropdown not found in the application."
            ExitTest
        End If

        ' Find flights
        WpfWindow("OpenText MyFlight Sample").WpfButton("FIND FLIGHTS").Click

        ' Select a flight
        WpfWindow("OpenText MyFlight Sample").WpfTable("flightsDataGrid").SelectCell 1, 2
        WpfWindow("OpenText MyFlight Sample").WpfButton("SELECT FLIGHT").Click

        ' Enter passenger details
        WpfWindow("OpenText MyFlight Sample").WpfEdit("passengerName").Set passengerName

        ' Text Checkpoint: Validate passenger name is entered correctly
        If WpfWindow("OpenText MyFlight Sample").WpfEdit("passengerName").GetROProperty("text") = passengerName Then
            Reporter.ReportEvent micPass, "Passenger Name Checkpoint", "Passenger name entered correctly: " & passengerName
        Else
            Reporter.ReportEvent micFail, "Passenger Name Checkpoint", "Passenger name entry failed."
        End If

        ' Submit the order
        WpfWindow("OpenText MyFlight Sample").WpfButton("ORDER").Click

       ' Take a screenshot after completing the booking
Desktop.CaptureBitmap After & "\After_Booking_" & PassName & "_" & timeStamp & ".png"

        ' Close and relaunch the application for the next customer
        If i < DataTable.GetRowCount Then
            WpfWindow("OpenText MyFlight Sample").Close
            appLaunched = False
            SystemUtil.Run "C:\Program Files (x86)\OpenText\UFT One\samples\Flights Application\FlightsGUI.exe"
            WpfWindow("OpenText MyFlight Sample").WpfEdit("agentName").Set DataTable.Value("AgentName", dtGlobalSheet)
            WpfWindow("OpenText MyFlight Sample").WpfEdit("password").SetSecure DataTable.Value("Password", dtGlobalSheet)
            WpfWindow("OpenText MyFlight Sample").WpfButton("OK").Click
        End If
    End If
Next

' Close the Flight GUI application after processing all customers
If appLaunched Then
    WpfWindow("OpenText MyFlight Sample").Close
    appLaunched = False
    Reporter.ReportEvent micPass, "Application Close", "The application was closed successfully after the last customer."
End If

' Stop the script after processing all customers
ExitTest @@ hightlight id_;_24774630_;_script infofile_;_ZIP::ssf52.xml_;_





