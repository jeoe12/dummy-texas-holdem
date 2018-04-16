/**
 * Created by dummy-team
 * 2017-10-12
 */

var phoneNumber;
var token;

// HTTP response code
var SUCCESS = 0;
var SESSION_TIMEOUT =2;
var FAILED = -1;
var WRONG_ENV = -2;
var AUTHENTICATION_FAILURE = -3;
var PLAYER_EXIST = -4;
var PLAYER_NOT_EXIST = -5;
var WRONG_VERIFICATION_CODE = -6;
var MULTI_ACTIVE_BOARD_CREATED = -7;
var LOGIN_FAILURE = -8;

// game status code
var STATUS_READY = 0;
var STATUS_PREPARING = 1;
var STATUS_RUNNING = 2;
var STATUS_FINISHED = 3;
var STATUS_ENDED = 4;

// global board information
var fullBoardList = [];
var currentBoardIndex = 0;
var currentBoard = null;

function setBoard(canSetBoard, player) {
    if (canSetBoard && player) {
        $('#goto_game_dialog').modal();
    } else {
        toastr.warning('请先登录之后再创建游戏');
        $('#goto_game_dialog').modal('hide');
        $('#signin_dialog').modal();
    }
}

function createBoard() {
    $.ajax({
        url: '/api/board/create_board',
        headers: {'phone-number': phoneNumber, 'token': token},
        type: 'POST',
        dataType: 'json',
        data: {
            gameName: 'texas_holdem',
            phoneNumber: phoneNumber
        },
        timeout: 20000,
        success: function (response) {
            console.log('create board response : ' + JSON.stringify(response));
            if (response.status.code === 0) {
                var board = response.entity;
                onBoardCreated(board);
            } else if (response.status.code === MULTI_ACTIVE_BOARD_CREATED) {
                console.log('create board failed : ' + JSON.stringify(response.entity));
                if (response.entity.ticket) {
                    gotoGame(response.entity.ticket, response.entity.port);
                }
            }
        },
        error: function () {
            console.log('create board failed');
            popUpHintDialog('服务器暂时没有响应，请稍后重试');
        }
    });
}

function onBoardCreated(board) {
    gotoGame(board.ticket, board.port);
}

function gotoGame(boardTicket, instancePort) {
    var ticket = boardTicket;
    var port = instancePort;
    var defaultChips = $('#game_default_chips').val();
    var defaultSb = $('#game_default_sb').val();
    var defaultRoundInterval = $('#game_round_interval').val();
    var defaultCommandInterval = $('#game_command_interval').val();
    var defaultCommandTimeout = $('#game_command_timeout').val();
    var defaultLostTimeout = $('#game_lost_timeout').val();
    var reloadChance = $('#game_reload_chance').val();
    var bgm = $('#game_bgm').is(':checked') ? 1 : 0;
    var sound = $('#game_sound').is(':checked') ? 1 : 0;
    var autoRestart = $('#auto_restart').is(':checked') ? 1 : 0;

    var hostName = window.location.hostname + ':' + window.location.port;
    var gameURL = 'http://' + hostName + '/game.html?phoneNumber='+phoneNumber+'&token='+token+'&ticket='+ticket+
        '&port='+port+'&bgm='+bgm+'&sound='+sound+'&auto='+autoRestart+'&defaultChips='+defaultChips+
        '&defaultSb='+defaultSb+'&roundInterval='+defaultRoundInterval+'&commandInterval='+defaultCommandInterval+
        '&reloadChance='+reloadChance+'&commandTimeout='+defaultCommandTimeout+'&lostTimeout='+defaultLostTimeout;
    window.open(gameURL);
    $('#goto_game_dialog').modal('hide');
}

function gotoRegister() {
    window.location = 'https://ai.cad-stg.trendmicro.com/reg/'
}

function validateSignIn(callback) {
    phoneNumber = localStorage.getItem('phoneNumber');
    token = localStorage.getItem('token');
    if (phoneNumber && token) {
        // get player information at client side
        $.ajax({
            url: '/api/players/validate_sign_in',
            headers: {"phone-number": phoneNumber, "token": token},
            type: 'POST',
            dataType: 'json',
            data: {
                phoneNumber: phoneNumber,
                token: token
            },
            timeout: 20000,
            success: function (response) {
                if (response.status.code === 0 && response.entity) {
                    var player = response.entity;
                    onSignedIn(true, player, callback);
                } else {
                    onSignedIn(false, null, callback);
                }
            },
            error: function () {
                toastr.error('服务器暂时没有响应，请稍后重试');
                onSignedIn(false, null, callback);
            }
        });
    } else {
        onSignedIn(false, null, callback);
    }
}

function onSignIn() {
    $('#signin_dialog').modal();
}

function signIn(callback) {
    var phoneNumber = $('#phone_number').val();
    var password = $('#password').val();
    if (isEmpty(phoneNumber) || isEmpty(password) || !validatePhoneNumber(phoneNumber)) {
        toastr.error('请输入正确的电话号码和密码');
        return;
    }
    $.ajax({
        url: '/api/players/sign_in',
        type: 'POST',
        dataType: 'json',
        data: {
            phoneNumber: phoneNumber,
            password: md5(password)
        },
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                var player = response.entity;
                onSignedIn(true, player, callback);
            } else {
                onSignedIn(false, null, callback);
            }
        },
        error: function () {
            toastr.error('服务器暂时没有响应，请稍后重试');
            onSignedIn(false, null, callback);
        }
    });
}

function onSignedIn(success, player, callback) {
    if (success) {
        if (callback) {
            callback(true, player);
        }
    } else {
        if (callback) {
            callback(false, null);
        }
    }
}

function showSignedIn(show, player) {
    if (show && player) {
        toastr.success('登录成功');
    } else {
        toastr.error('登录失败，电话号码或密码错误');
    }
    if (showWelcome) {
        showWelcome(show, player);
    }
}

function showWelcome(show, player) {
    if (show && player) {
        clearSignInModal();
        $('#player_name').html(player.name);
        $('#login_button').hide();
        $('#welcome').show();
        rememberInLs(player);
    } else {
        $('#player_name').val('');
        $('#login_button').show();
        $('#welcome').hide();
        clearLs();
    }
}

function clearSignInModal() {
    $('#phone_number').val('');
    $('#password').val('');

    $('#signin_dialog').modal('hide');
}

function onResetPassword() {
    $('#signin_dialog').modal('hide');
    $('#reset_password_dialog').modal();
}

function resetPassword() {
    var phoneNumber = $('#reset_password_phone_number').val();
    var verificationCode = $('#reset_password_verification_code').val();
    var password = $('#reset_password_password').val();
    var confirm = $('#reset_password_confirm').val();

    if (isEmpty(phoneNumber) || !validatePhoneNumber(phoneNumber)) {
        toastr.error('手机号码格式不正确');
        return;
    }
    if (isEmpty(verificationCode)) {
        toastr.error('请填写验证码');
        return;
    }
    if (isEmpty(password)) {
        toastr.error('请填写密码');
        return;
    }
    if (isEmpty(confirm)) {
        toastr.error('请重复填写密码');
        return;
    }
    if (confirm !== password) {
        toastr.error('两次填写的密码不一致');
        return;
    }
    $.ajax({
        url: '/api/players/reset_password',
        type: 'POST',
        data: JSON.stringify({
            phoneNumber: phoneNumber,
            verificationCode: verificationCode,
            password: md5(password)
        }),
        contentType: 'application/json; charset=utf-8',
        timeout: 20000,
        success: function(response) {
            if (response.status.code === 0) {
                toastr.success('密码修改成功');
                clearResetPasswordModal();
            } else {
                switch(parseInt(response.status.code)) {
                    case WRONG_ENV:
                        toastr.error('运行环境错误');
                        break;
                    case AUTHENTICATION_FAILED:
                        toastr.error('短信验证码无效');
                        break;
                    case PLAYER_EXISTED:
                        toastr.error('此手机号已注册');
                        break;
                    case INVALID_EMAIL:
                        toastr.error('邮箱地址无效');
                        break;
                    default:
                        toastr.error('注册失败, 请检查所填内容是否正确');
                        break;
                }
            }
        },
        error: function() {
            toastr.success('密码修改失败');
        }
    });
}

function clearResetPasswordModal() {
    $('#reset_password_phone_number').val('');
    $('#reset_password_verification_code').val('');
    $('#reset_password_password').val('');
    $('#reset_password_confirm').val('');

    $('#reset_password_dialog').modal('hide');
}

function sendVerificationCode() {
    var phoneNumber = $('#reset_password_phone_number').val();
    if (null === phoneNumber || !validatePhoneNumber(phoneNumber)) {
        toastr.error('手机号码格式不正确');
        return;
    }
    $.ajax({
        url: '/api/players/send_sms_for_update',
        type: 'POST',
        data: JSON.stringify({phoneNumber: phoneNumber}),
        contentType: 'application/json; charset=utf-8',
        timeout: 20000,
        success: function(response) {
            if (response.status.code === 0) {
                toastr.success('短信验证码发送成功');
            } else {
                switch(parseInt(response.status.code)) {
                    case PLAYER_NOT_EXIST:
                        toastr.error('此手机号没有注册');
                        break;
                    default:
                        toastr.error('短信发送失败, 请检查手机号码是否正确');
                        break;
                }
            }
        },
        error: function() {
            toastr.error('短信发送失败, 请检查手机号码是否正确');
        }
    });
}

function rememberInLs(player) {
    phoneNumber = player.phoneNumber;
    token = player.token;
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('token', token);
}

function clearLs() {
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('token');
}

function popUpHintDialog(hint) {
    $('#text_hint').empty();
    $('#text_hint').append(hint);
    $('#hint_dialog').modal();
}
