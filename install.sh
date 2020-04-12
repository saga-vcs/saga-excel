echo "Installing Saga Excel Add-in..."

read -r -d '' MANIFEST_DATA << EOM
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<OfficeApp xmlns="http://schemas.microsoft.com/office/appforoffice/1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bt="http://schemas.microsoft.com/office/officeappbasictypes/1.0" xmlns:ov="http://schemas.microsoft.com/office/taskpaneappversionoverrides" xsi:type="TaskPaneApp">
  <Id>5124af38-a6c9-413c-ade3-df259fd3b31d</Id>
  <Version>1.0.0.0</Version>
  <ProviderName>Saga</ProviderName>
  <DefaultLocale>en-US</DefaultLocale>
  <DisplayName DefaultValue="Saga VCS"/>
  <Description DefaultValue="A robust version control system for excel."/>
  <IconUrl DefaultValue="https://excel.sagalab.org/assets/icon-32.png"/>
  <HighResolutionIconUrl DefaultValue="https://excel.sagalab.org/assets/icon-80.png"/>
  <SupportUrl DefaultValue="https://www.excel.sagalab.org"/>
  <AppDomains>
    <AppDomain>sagalab.org</AppDomain>
  </AppDomains>
  <Hosts>
    <Host Name="Workbook"/>
  </Hosts>
  <DefaultSettings>
    <SourceLocation DefaultValue="https://excel.sagalab.org/taskpane.html"/>
  </DefaultSettings>
  <Permissions>ReadWriteDocument</Permissions>
  <VersionOverrides xmlns="http://schemas.microsoft.com/office/taskpaneappversionoverrides" xsi:type="VersionOverridesV1_0">
    <Hosts>
      <Host xsi:type="Workbook">
        <DesktopFormFactor>
          <GetStarted>
            <Title resid="GetStarted.Title"/>
            <Description resid="GetStarted.Description"/>
            <LearnMoreUrl resid="GetStarted.LearnMoreUrl"/>
          </GetStarted>
          <FunctionFile resid="Commands.Url"/>
          <ExtensionPoint xsi:type="PrimaryCommandSurface">
            <OfficeTab id="TabHome">
              <Group id="CommandsGroup">
                <Label resid="CommandsGroup.Label"/>
                <Icon>
                  <bt:Image size="16" resid="Icon.16x16"/>
                  <bt:Image size="32" resid="Icon.32x32"/>
                  <bt:Image size="80" resid="Icon.80x80"/>
                </Icon>
                <Control xsi:type="Button" id="TaskpaneButton">
                  <Label resid="TaskpaneButton.Label"/>
                  <Supertip>
                    <Title resid="TaskpaneButton.Label"/>
                    <Description resid="TaskpaneButton.Tooltip"/>
                  </Supertip>
                  <Icon>
                    <bt:Image size="16" resid="Icon.16x16"/>
                    <bt:Image size="32" resid="Icon.32x32"/>
                    <bt:Image size="80" resid="Icon.80x80"/>
                  </Icon>
                  <Action xsi:type="ShowTaskpane">
                    <TaskpaneId>ButtonId1</TaskpaneId>
                    <SourceLocation resid="Taskpane.Url"/>
                  </Action>
                </Control>
              </Group>
            </OfficeTab>
          </ExtensionPoint>
        </DesktopFormFactor>
      </Host>
    </Hosts>
    <Resources>
      <bt:Images>
        <bt:Image id="Icon.16x16" DefaultValue="https://excel.sagalab.org/assets/icon-16.png"/>
        <bt:Image id="Icon.32x32" DefaultValue="https://excel.sagalab.org/assets/icon-32.png"/>
        <bt:Image id="Icon.80x80" DefaultValue="https://excel.sagalab.org/assets/icon-80.png"/>
      </bt:Images>
      <bt:Urls>
        <bt:Url id="GetStarted.LearnMoreUrl" DefaultValue="https://go.microsoft.com/fwlink/?LinkId=276812"/>
        <bt:Url id="Commands.Url" DefaultValue="https://excel.sagalab.org/commands.html"/>
        <bt:Url id="Taskpane.Url" DefaultValue="https://excel.sagalab.org/taskpane.html"/>
      </bt:Urls>
      <bt:ShortStrings>
        <bt:String id="GetStarted.Title" DefaultValue="Get started with you Saga VCS!"/>
        <bt:String id="CommandsGroup.Label" DefaultValue="Commands Group"/>
        <bt:String id="TaskpaneButton.Label" DefaultValue="Saga VCS"/>
      </bt:ShortStrings>
      <bt:LongStrings>
        <bt:String id="GetStarted.Description" DefaultValue="Saga has loaded succesfully. Go to the HOME tab and click the 'Saga VCS' button to get started."/>
        <bt:String id="TaskpaneButton.Tooltip" DefaultValue="Click to open Saga VCS"/>
      </bt:LongStrings>
    </Resources>
  </VersionOverrides>
</OfficeApp>
EOM

DIRECTORY="/Users/${USER}/Library/Containers/com.microsoft.Excel/Data/Documents/wef"

# Check if the sideloading directory exists
if [ -d "$DIRECTORY" ]; 
then
  echo "$MANIFEST_DATA" > "${DIRECTORY}/saga.manifest.xml"

  echo "Saga was sucessfully installed."
  echo "To begin using saga:"
  echo "  1. Open Excel"
  echo "  2. Go to the Insert tab"
  echo "  3. Click the dropdown arrow next to \"My Add-ins\""
  echo "  4. Select Saga VCS"

else
  echo "Unable to install saga. Please make sure Excel is installed on your computer."
fi