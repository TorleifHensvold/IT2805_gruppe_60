function submit_inquiry(email, content, alert) {
	if (email.value.length > 0 && content.value.length > 0) {
		alert.style.display = "block";
		email.value = "";
		content.value = "";
	}
}