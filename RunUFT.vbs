' Create UFT One Application Object
Dim UFTApp
Set UFTApp = CreateObject("QuickTest.Application")

' Ensure UFT One is launched properly
If Not UFTApp.Launched Then
    UFTApp.Launch
    UFTApp.Visible = True ' Ensure UFT One opens in UI mode
End If

' Open the test
UFTApp.Open "C:\Users\durge\Desktop\INFO6225\Assignment2", True

' Create Results Object to store test results
Dim ResultsOptions
Set ResultsOptions = CreateObject("QuickTest.RunResultsOptions")

' Set the path where results should be stored
ResultsOptions.ResultsLocation = "C:\Users\durge\Desktop\INFO6225\TestReport"

' Run the test and save results
UFTApp.Test.Run ResultsOptions

' Close the test and UFT One
UFTApp.Test.Close
UFTApp.Quit

' Cleanup
Set ResultsOptions = Nothing
Set UFTApp = Nothing
