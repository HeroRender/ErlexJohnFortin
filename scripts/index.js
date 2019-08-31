// Parent Object
function objProject(Container, Source) {
    // Methods/functions
    this.LoadData = function (URL) {
        $.get(URL, function (DATA) {
            thisObject.Propeties = DATA;
            // Render the object
            thisObject.Render();
        });
    }

    this.Render = function () {
        let Prop = this.Propeties;
        $('#' + this.Container)
            .html('')
            .append($('<div>')
                .addClass('resume-item d-flex flex-column flex-md-row justify-content-between mb-5')
                .append($('<div>')
                    .addClass('resume-content')
                    .append($('<h3>')
                        .addClass('mb-0')
                        .text(Prop.ProjectName || '<Unnamed>'))
                    .append($('<div>')
                        .addClass('subheading mb-3')
                        .text((Prop.Summary || Prop.Description) + ' For more information please click ')
                        .append($('<a>')
                            .on('click', function () { openDetails(Prop) })
                            .attr('href', 'javascript:void(0);')
                            .html('here <i class="fas fa-link"></i>.')))
                    .append($('<p>')
                        .html('Platform(s): <span class="text-primary lead">' + (Prop.Platform || '<No Info>') + '</span>'))
                )
                .append($('<div>')
                    .addClass('resume-thumbnail justify-content-center')
                    .append($('<img/>')
                        .attr('src', Prop.Thumbnail)
                        .addClass('img-fluid img-thumbnail')
                    )
                )
            )
        /*
        if ($('#' + this.Container).hasClass('text-right')) {
            $('#' + this.Container + ' .resume-item')
                .prepend($('<div>')
                    .append(`<img src="${Prop.Thumbnail}" class="img-fluid" />`)
                    //.addClass('resume-date text-md-right text-primary')
                    //.html(Prop.Platform || '(No Info)')
                    //.attr('id', divScreenShots)
                )
        } else {
            $('#' + this.Container + ' .resume-item')
                .append($('<div>')
                    .append(`<img src="${Prop.Thumbnail}" class="img-fluid" />`)
                    //.addClass('resume-date text-md-right text-primary')
                    //.html(Prop.Platform || '(No Info)')
                    //.attr('id', divScreenShots)
                )

        }*/
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

function openDetails(obj) {
    let carouselID = 'Carousel_' + (new Date()).getTime();
    let detailID = 'Detail_' + (new Date()).getTime();
    $('#detailModal .modal-title').text(obj.ProjectName);
    $('#detailModal .modal-body').html('')

    $('#detailModal .modal-body').append('<div class="row">')

    $('#detailModal .modal-body .row')
        .append($('<div class="col">')
            .append($(`<div id=${carouselID} class="carousel slide bg-light" data-ride="carousel">`)
                .append($('<ol class="carousel-indicators bg-secondary rounded">').css('opacity', '0.4'))
                .append('<div class="carousel-inner" role="listbox">')
                .append($(`<a class="carousel-control-prev" href="#${carouselID}" role="button" data-slide="prev">`)
                    .append('<span class="carousel-control-prev-icon" aria-hidden="true">')
                    .append('<span class="sr-only">Previous</span>'))
                .append($(`<a class="carousel-control-next" href="#${carouselID}" role="button" data-slide="next">`)
                    .append('<span class="carousel-control-next-icon" aria-hidden="true">')
                    .append('<span class="sr-only">Next</span>'))
            ))

    if (obj.Orientation === 1) {
        $('#detailModal .modal-body .row')
            .prepend($('<div class="col">').attr('id', detailID))
    } else {
        $('#detailModal .modal-body')
            .append(`<div class="row">
                        <div class="col mt-3" id="${detailID}"></div>
                    </div>`)
    }

    // Draw Details
    $('#' + detailID)
        .append('<h4>Description:</h4>')
        .append($('<p>')
            .append(obj.Description + ` Want to see it in action? click <a href="${obj.Link}" target="_blank">here <i class="fas fa-external-link-alt"></i>.</a>`))
        .append('<h4>Features:</h4>')
        .append($('<p>').text(obj.Features))
        .append('<h4>Tools and Technologies:</h4>')
        .append($('<p>').text(obj.Tools))

    // Draw Screen Shot Carousel
    let ScreenShots = obj.ScreenShots;
    for (const item in ScreenShots) {
        $('#' + carouselID + ' .carousel-inner')
            .append($('<div class="carousel-item ' + (item == 0 ? 'active' : '') + '">')
                .append($('<img>')
                    .attr('src', ScreenShots[item].URL)
                    .attr('alt', ScreenShots[item].Name)
                    .addClass('img-fluid img-thumbnail'))
                //.css('width', '100%')
                /*.append($('<div class="carousel-caption d-none d-md-block bg-dark">')
                    .append($('<h5>').text(ScreenShots[item].Name))
                    .append($('<p>').text(ScreenShots[item].Details))
                )*/
            )


        $('#' + carouselID + ' .carousel-indicators')
            .append($('<li>')
                .attr('data-target', '#' + carouselID)
                .attr('data-slide-to', item)
                .addClass(item == 0 ? 'active' : '')
            );
    }

    $('#' + carouselID).carousel({ interval: 2500, pause: "hover", keyboard: true });
    $("#detailModal").modal("toggle");
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
});