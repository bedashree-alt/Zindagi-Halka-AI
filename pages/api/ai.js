<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Zindagi Halka AI Hub</title>
<style>
  body { font-family: Arial, sans-serif; padding: 20px; }
  textarea { width: 100%; height: 100px; margin-bottom: 10px; }
  select, button { padding: 8px; margin: 5px 0; }
  .output { margin-top: 15px; padding: 10px; border: 1px solid #ccc; min-height: 100px; background: #f9f9f9; }
  img { max-width: 100%; }
</style>
</head>
<body>

<h2>Zindagi Halka AI Hub</h2>

<textarea id="prompt" placeholder="Type your question, text, or idea..."></textarea>

<br>

<select id="task">
  <option value="solve">Solve Problem</option>
  <option value="grammar">Correct Grammar</option>
  <option value="image">Generate Picture</option>
  <option value="chat">Chat / General AI</option>
</select>

<br>

<button id="submitBtn">Submit</button>

<div class="output" id="output"></div>

<script>
document.getElementById("submitBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  const task = document.getElementById("task").value;
  const outputDiv = document.getElementById("output");

  if (!prompt) return alert("Please type something!");

  outputDiv.innerHTML = "Processing...";

  try {
    // Call your backend API route
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, prompt })
    });

    const data = await res.json();

    if (task === "image") {
      outputDiv.innerHTML = `<img src="${data.result}" alt="AI Generated">`;
    } else {
      outputDiv.textContent = data.result;
    }
  } catch (err) {
    console.error(err);
    outputDiv.textContent = "Error occurred. Check console.";
  }
});
</script>

</body>
</html>
