/**
 * champler.js
 */

$('#input-number').change(function() {
    var isError = true;

    var n = $('#input-number').val();
    if (n == '') {
        $('#inputs-error-text').text('スクランブル数を入力してください。');
    } else if (!n.match(/^[0-9]+$/) || n < 1 || 100 < n) {
        $('#inputs-error-text').text('スクランブル数には、1以上100以下の数値を入力してください。');
    } else {
        isError = false;
    }

    if (isError) {
        fadeInContainerNoWait('#inputs-error');
        $('#input-number').addClass('invalid');
        $('#button-chample').attr('disabled', true);
    } else {
        fadeOutContainer('#inputs-error');
        $('#input-number').removeClass('invalid');
        $('#button-chample').attr('disabled', false);
    }
});

$(document).ready(function() {
    $('#inputs-form').submit(function(event) {
        // Submit キャンセル
        event.preventDefault();

        var $form = $(this);
        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            dataType: 'jsonp',
            jsonpCallback: 'callback',
            data: $form.serialize(),
            timeout: 30000,

            beforeSend: function(xhr, settings) {
                $('#button-chample').attr('disabled', true);
                fadeOutContainer('#results');
                fadeOutContainer('#results-error');
                fadeInContainer('#results-loading');
                $('#results-error').hide();
            },
            complete: function(xhr, textStatus) {
                $('#button-chample').attr('disabled', false);
                fadeOutContainer('#results-loading');
            },

            success: function(result, textStatus, xhr) {
                var results = result.results;
                var html = '', text = '';
                for (var i = 0, l = results.length; i < l; i++) {
                    html += '<tr><td class="idx">' + (i + 1) + '</td>';
                    html += '<td class="scramble">' + results[i].sequence + '</td></tr>';
                    text += (i + 1) + '. ';
                    text += results[i].sequence + '\n';
                }
                $('#results-tbody').html(html);
                $('#results-text').text(text);
                fadeInContainer('#results');
            },
            error: function(xhr, textStatus, error) {
                fadeInContainer('#results-error');
            }
        });
    });

    $('#button-copy').click(function() {
        $('#results-text').show();
        var textarea = document.getElementById('results-text');
    });
});

// GroundworkCSS の フェードイン・フェードアウト 機能を用いて
// コンテナを表示・非表示する
var fadeInContainerNoWait = function(id) {
    $(id).removeClass('fadeOut');
    $(id).addClass('fadeIn');
    $(id).show();
};
var fadeInContainer = function(id) {
    setTimeout(function() {
        fadeInContainerNoWait(id);
    }, 500);
};
var fadeOutContainer = function(id) {
    $(id).removeClass('fadeIn');
    $(id).addClass('fadeOut');
    setTimeout(function() {
        $(id).hide();
    }, 500);
};
