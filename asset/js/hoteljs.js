$(document).ready(function() {


    setTimeout(function() {
        $('body').removeClass('hideme');
    }, 150);

    var datepicker;
    var price;
    var img;
    var input;
    var pricex;
    var checkin;
    var checkout;

    $(".hotel-carousel").owlCarousel({
        items: 1,
        margin: 10,
        autoHeight: true,
        loop: true,
        animateOut: 'fadeOut',
        autoplay: true,
        dots: false,
        autoplayTimeout: 6000,
        nav: true,
        navText: ["<img src='./asset/img/chevron-compact-left.svg' alt='Previous Slide'>", "<img src='./asset/img/chevron-compact-right.svg' alt='Next Slide'>"]


    });

    $('.owl-next').on('click', function() {
        $('.owl-carousel').trigger('stop.owl.autoplay');
        setTimeout(function() {
            $('.owl-carousel').trigger('play.owl.autoplay');
        }, 4000);
    });

    $('.owl-prev').on('click', function() {
        $('.owl-carousel').trigger('stop.owl.autoplay');
        setTimeout(function() {
            $('.owl-carousel').trigger('play.owl.autoplay');
        }, 4000);
    });

    $(".review-carousel").owlCarousel({
        items: 1,
        margin: 10,
        autoHeight: true,
        loop: true,
        autoplay: true,
        mouseDrag: false,
        pullDrag: false,
        freeDrag: false,
        dots: false,
    });


    input = document.getElementById('datepick');

    datepicker = new HotelDatepicker(input, {
        format: 'DD-MM-YYYY',
        maxNights: 15,
        onSelectRange: function() {
            $('#open-datepicker').attr('class', 'btn btn-secondary');
        }

    });

    $('#close-datepick').addClass('d-none');

    input.addEventListener('afterClose', function() {
        if ($("#datepick").val() == "") {
            $('#open-datepicker').removeClass('active');



        } else {
            let text = datepicker.getValue();
            $('.selectedDaysBtn').removeClass('disabled');
            $('.selectedDaysBtn').addClass('active');
            $('#open-datepicker').removeClass('active');
            const dateArray = text.split(" ");
            checkin = dateArray[0];
            checkout = dateArray[2];
            $('#selectedDates').text(text);
            pricex = datepicker.getNights() * price;
            console.log(pricex);
            console.log(price);
            $('.selectedDays').text('Staying for ' + datepicker.getNights() + ' nights: £' + pricex);
            $('.checI').html('<span>Check-in:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + checkin + '</span>');
            $('.checO').html('<span>Check-out:&nbsp;&nbsp;&nbsp;&nbsp;' + checkout + '</span>');
        }
    });

    $('.book').click(function() {
        price = $(this).parent().next().text();
        img = $(this).parent().parent().parent().parent().children('a').children('img').attr('src');
        room = $(this).parent().parent().parent().parent().parent().children('p').text();

        console.log(price);
        console.log(img);

        $('.modal-photo').attr('src', img);
        $('.modal-title').text('Reserve - ' + room);

        $("#reserveBackdrop").modal('show');
        setTimeout(function() {
            $('#open-datepicker').addClass('active');
            datepicker.open();
        }, 500);
    });


    $('#open-datepicker').click(function() {
        if ($('#datepicker-datepick').hasClass('datepicker--open')) {
            datepicker.close();
        } else {
            $('.selectedDays').text('...');
            $('#selectedDates').text('...');
            $('.selectedDaysBtn').addClass('disabled');
            $("#totalp").text('£0');
            datepicker.open();
            $('#open-datepicker').addClass('active');
        }


    });


    $('.closemodal').click(function() {

        if ($('#datepicker-datepick').hasClass('datepicker--closed')) {
            $("#reserveBackdrop").modal('hide');
            $('form').removeClass('was-validated');
            $('form').find('input').val('');
            $('#selectedDates').text('Select Dates');
            $('.selectedDays').text('...');
            $("#invalidCheck").prop('checked', false);
            datepicker.clear();



        } else {
            datepicker.close();
            setTimeout(function() {
                $("#reserveBackdrop").modal('hide');
                $('form').removeClass('was-validated');
                $('form').find('input').val('');
                $('#selectedDates').text('Select Dates');
                $('.selectedDays').text('...');
                $("#invalidCheck").prop('checked', false);
                datepicker.clear();



            }, 500);
        }
    });

    $('.doneCloseModal').click(function() {
        $('#confirmModal').modal('hide');
        setTimeout(function() {
            $("#reserveBackdrop").modal('hide');
            $('form').removeClass('was-validated');
            $('form').find('input').val('');
            $('#selectedDates').text('Select Dates');
            $('.selectedDays').text('...');
            $("#invalidCheck").prop('checked', false);
            datepicker.clear();

        }, 500);
    });


    $('#resconfirm').click(function() {

        if ($('#datepick').val() == "") {
            $('#open-datepicker').addClass('btn-danger');
        } else {
            $("#submitform").click();
        }

    });
    // Disable form submission
    (function() {
        'use strict';

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms).forEach(function(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {

                    console.log('validated');
                    event.preventDefault();
                    event.stopPropagation();
                    $('form *').prop('disabled', true);
                    $('.overlay').addClass('fade-bg');
                    $('.overlay').append("<div class='cssload-spin-box'></div>");
                    setTimeout(function() {
                        $('#resnumber').text('HB' + Math.floor(Math.random() * 10000000));
                        $('#cname').text($('#fname').val() + ' ' + $("#lname").val());
                        $("#cemal").text($("#email").val());
                        $("#ctel").text($("#tel").val());

                        $('#room-name').text(room);
                        $('#checI').text(checkin);
                        $('#checO').text(checkout);
                        $('#duration').text(datepicker.getNights() + ' nights');
                        $('#cost').text(pricex);
                        $('form *').prop('disabled', false);
                        $("#invalidCheck").prop('checked', false);
                        $('.selectedDaysBtn').prop('disabled', true);
                        $('.modal-title').text('Reservation Confirmed');
                        $("#reserveBackdrop").modal('toggle');
                        $('.overlay').html("");
                        setTimeout(function() {
                            $('#confirmModal').modal('toggle');
                            $('.overlay').removeClass('fade-bg');
                        }, 300);
                    }, 3000);

                }
                form.classList.add('was-validated');
            }, false);
        });
    })();

    const lightbox = GLightbox({
        touchNavigation: true,
        loop: true,
    });



    $('#grandpage').click(function() {
        window.location = "grand.html";
    });

    $('#premiumpage').click(function() {
        window.location = "premium.html";
    });

    $('#premierpage').click(function() {
        window.location = "premier.html";
    });

    $('#minipage').click(function() {
        window.location = "minimal.html";
    });

    $('.message').click(function() {
        $("#msgBackdrop").modal('toggle');
    });


    $('.sendmsg').click(function() {
        $('.submit').click();
    });

    // Disable form submission
    (function() {
        'use strict';

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validationmsg');

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms).forEach(function(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                    form.classList.add('was-validated');
                } else {
                    event.preventDefault();
                    event.stopPropagation();
                    $("#msgBackdrop").modal('toggle');
                    $('.msg-frm').trigger("reset");
                    $('.msg-frm').removeClass('was-validated');

                }
            }, false);
        });
    })();

    $('.closemodalmsg').click(function() {
        $("#msgBackdrop").modal('toggle');
        $('.msg-frm').trigger("reset");
    });

});
