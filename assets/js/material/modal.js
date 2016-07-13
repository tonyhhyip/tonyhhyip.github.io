// modale dialog vertical alignment
'use strict';

$(document).on('hidden.bs.modal', '.modal-va-middle', function () {
	$(this).removeClass('modal-va-middle-show');
});

$(document).on('show.bs.modal', '.modal-va-middle', function () {
	$(this).addClass('modal-va-middle-show');
});
