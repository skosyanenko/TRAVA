$(document).ready(function() {
    $('#name, #message').on('blur', function() {
        let $this = $(this),
            value = $this.val();

        value !== '' ?
            $this.removeClass('error').addClass('success') :
            $this.removeClass('success').addClass('error');
    });

    // Добавляем маску для поля с номером телефона
    $('#phone').mask('+7 (999) 999-99-99');
    $('#phone').on('blur', function() {
        let $this = $(this),
            value = $this.val();
        value.length < 11 ?
            $this.removeClass('success').addClass('error') :
            $this.removeClass('error').addClass('success');
    });

    // Добавляем валидацию E-mail
    $('#email').on('blur', function() {
        let pattern = /^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i,
            $this = $(this),
            value = $this.val();

        if(value !== '') {
            pattern.test(value) ?
                $this.removeClass('error').addClass('success') :
                $this.removeClass('success').addClass('error');
        } else {
            $this.removeClass('success').addClass('error');
        }
    });

    // Проверяет отмечен ли чекбокс согласия с обработкой персональных данных
    $('#check').on('click', function() {
        let $this = $(this);

        if ($("#check").prop("checked")) {
            $('#button').attr('disabled', false);
            $this.removeClass('error').addClass('success');
        } else {
            $('#button').attr('disabled', true);
            $this.removeClass('success').addClass('error');
        }
    });

    // Отправляет данные из формы на сервер и получает ответ
    $('#contactForm').on('submit', function(event) {
        event.preventDefault();
        let form = $('#contactForm'),
            button = $('#button'),
            answer = $('#answer'),
            successText = $('#success');

        $.ajax({
            url: '/send-email',
            type: 'POST',
            data: form.serialize(),
            success: function(result) {
                if (result.errno) {
                    console.log(result);
                    successText.fadeIn(300).text('Ошибка при отправке заявки, попробуйте позже!').addClass('sent-error');
                } else {
                    form.css('margin-bottom', 0).hide();
                    successText.fadeIn(300).text('Заявка успешно отправлена!');
                }
            }
        });
    });
});