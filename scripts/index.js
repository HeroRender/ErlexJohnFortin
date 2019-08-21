// Parent Object
function objProject(Container, Source) {
    // Methods/functions
    this.LoadData = function (URL) {
        $.get(URL, function (DATA) {
            thisObject.Propeties = DATA;
            thisObject.ProjectName = DATA.ProjectName;
            thisObject.Link = DATA.Link;
            thisObject.Description = DATA.Description
            thisObject.Platform = DATA.Platform
            thisObject.ScreenShots = DATA.ScreenShots;

            // Render the object
            thisObject.Render();
        });
    }

    this.Render = function () {
        $('#' + this.Container)
            .html('')
            .append($('<h1>')
                .text(this.ProjectName || '<Unnamed>'))
            .append($('<p>')
                .text((this.Description || '<No Info>') + (this.Link ? ' For more information please click ' : ''))
                .append($('<a>')
                    .attr('href', this.Link || '#')
                    .text(this.Link ? 'here.' : '')))
            .append($('<p>').text(this.Platform) || '<No Info>')
            .append($('<div>').attr('id', divScreenShots))

        CreateScreenShots(this.ScreenShots);
    }

    // Abstracted Methods/functions
    function CreateScreenShots(ScreenShots) {
        for (const item in ScreenShots) {
            $('#' + divScreenShots)
                .append($('<img>')
                    .attr('src', ScreenShots[item].URL)
                    .attr('alt', ScreenShots[item].Name))
                .append($('<h5>').text(ScreenShots[item].Name))
                .append($('<p>').text(ScreenShots[item].Details))
        }
    }

    // Properties
    this.Propeties = {};
    this.Container = Container;
    this.ProjectName;
    this.Link;
    this.Description;
    this.Platform;
    this.ScreenShots;

    // Abstracted Property
    let thisObject = this;
    let divScreenShots = this.Container + '_ScreenShots';


    // Functions on object is created
    if (Source) {
        this.Propeties = this.LoadData(Source);
    }
}

$(document).ready(function () {
    // Corporate
    let objSync = new objProject('divProjSync', 'services/sync.json');
    let objRTAV = new objProject('divProjRTAV', 'services/rtav.json')
    let objBridge = new objProject('divProjBridge', 'services/bridge.json');
    let objGPS = new objProject('divProjGPS', 'services/gps.json');
    let objJAC = new objProject('divProjJAC', 'services/jac.json');

    // Games
    let objWQP = new objProject('divProjWQP', 'services/wqp.json');
    let objGSQ = new objProject('divProGSQ', 'services/gsq.json');
    let objCOE = new objProject('divProjCOE', 'services/coe.json');
})