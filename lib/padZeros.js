export default function padZeros(num) {
	return `${num}`.length == 1 ? `0${num}` : num;
}
