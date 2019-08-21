// Parent Object
function objProject(Container, Source) {
    // Methods/functions
    this.LoadData = function(URL) {
        $.get(URL, function(DATA) {
            thisObject.Propeties = DATA;
            // Render the object
            thisObject.Render();
        });
    }

    this.Render = function() {
        let Prop = this.Propeties;
        $('#' + this.Container)
            .html('')
            .addClass('row')
            .append($('<div>')
                .addClass('col')
                .append($('<h1>')
                    .text(Prop.ProjectName || '<Unnamed>'))
                .append($('<p>')
                    .text((Prop.Description || '<No Info>') + (Prop.Link ? ' For more information please click ' : ''))
                    .append($('<a>')
                        .attr('href', Prop.Link || '#')
                        .text(Prop.Link ? 'here.' : '')))
                .append($('<p>').html(Prop.Platform) || '<No Info>')
            ).append($('<div>').addClass('col').attr('id', divScreenShots))

        CreateScreenShots(Prop.ScreenShots);
    }

    // Abstracted Methods/functions
    function CreateScreenShots(ScreenShots) {
        if (ScreenShots.lenght > 0) return false;
        let carouselID = divScreenShots + '_Carousel';
        $('#' + divScreenShots)
            .append($(`<div id=${carouselID} class="carousel slide" data-ride="carousel">`)
                .append('<ol class="carousel-indicators">')
                .append('<div class="carousel-inner" role="listbox">')
                .append($(`<a class="carousel-control-prev" href="#${carouselID}" role="button" data-slide="prev">`)
                    .append('<span class="carousel-control-prev-icon" aria-hidden="true">')
                    .append('<span class="sr-only">Previous</span>'))
                .append($(`<a class="carousel-control-next" href="#${carouselID}" role="button" data-slide="prev">`)
                    .append('<span class="carousel-control-next-icon" aria-hidden="true">')
                    .append('<span class="sr-only">Next</span>'))
            )

        for (const item in ScreenShots) {
            $('#' + carouselID + ' .carousel-inner')
                .append($('<div class="carousel-item ' + (item == 0 ? 'active' : '') + '">')
                    .append($('<img>')
                        .attr('src', ScreenShots[item].URL)
                        .attr('alt', ScreenShots[item].Name)
                        .addClass('img-fluid img-thumbnail'))
                    .css('width', '80%')
                    .append($('<div class="carousel-caption d-none d-md-block bg-dark">')
                        .append($('<h5>').text(ScreenShots[item].Name))
                        .append($('<p>').text(ScreenShots[item].Details))
                    )
                )
            $('#' + carouselID + ' .carousel-indicators')
                .append($('<li>')
                    .attr('data-target', '#' + carouselID)
                    .attr('data-slide-to', item)
                    .addClass(item == 0 ? 'active' : '')
                );
        }
    }

    // Properties
    this.Propeties = {};
    this.Container = Container;

    // Abstracted Property
    let thisObject = this;
    let divScreenShots = this.Container + '_ScreenShots';


    // Functions on object is created
    if (Source) {
        this.Propeties = this.LoadData(Source);
    }
}

$(document).ready(function() {
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
});