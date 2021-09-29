export function formatToIcalDate(date) {
	//yyyymmdd
	return `${date.getFullYear()}${addLeadingZero(
		date.getMonth() + 1
	)}${addLeadingZero(date.getDate())}`;
}

function addLeadingZero(num) {
	return ('0' + num.toString()).slice(-2);
}
