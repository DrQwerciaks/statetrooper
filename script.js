function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const heightCm = parseFloat(document.getElementById("height").value);

  if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
    document.getElementById("result").innerText = "Podaj poprawne dane.";
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  const bmiRounded = bmi.toFixed(1);
  let interpretation = "";

  if (bmi < 16) {
    interpretation = "Wygłodzenie";
  } else if (bmi < 17) {
    interpretation = "Wychudzenie";
  } else if (bmi < 18.5) {
    interpretation = "Niedowaga";
  } else if (bmi < 25) {
    interpretation = "Waga prawidłowa";
  } else if (bmi < 30) {
    interpretation = "Nadwaga";
  } else {
    interpretation = "Otyłość";
  }

  document.getElementById("result").innerText = `Twoje BMI: ${bmiRounded} (${interpretation})`;
}

 let stream;
    const video = document.getElementById("camera");
    const soundOn = document.getElementById("soundOn");
    const soundOff = document.getElementById("soundOff");

    function showCameraStatus(message, duration = 2000, showOfficer = false) {
      const statusElement = document.getElementById('cameraStatus');
      const officerElement = document.getElementById('officerImage');
      
      statusElement.textContent = message;
      statusElement.classList.remove('hidden');
      statusElement.classList.add('shake');
      
      if (showOfficer) {
        setTimeout(() => {
          officerElement.classList.remove('hidden');
          officerElement.classList.add('officer-appear', 'officer-shake');
          // Wymusza odtworzenie video
          officerElement.play().catch(e => console.log('Autoplay zablokowany:', e));
        }, duration);
        
        setTimeout(() => {
          statusElement.classList.add('hidden');
          statusElement.classList.remove('shake');
          officerElement.classList.add('hidden');
          officerElement.classList.remove('officer-appear', 'officer-shake');
          // Pauzuje video gdy jest ukryte
          officerElement.pause();
        }, duration + 3000);
      } else {
        setTimeout(() => {
          statusElement.classList.add('hidden');
          statusElement.classList.remove('shake');
        }, duration);
      }
    }

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        soundOn.play();
        showCameraStatus('BODY CAM ON');
      } catch (err) {
        console.error("Błąd dostępu do kamerki:", err);
      }
    }

    function stopCamera() {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        soundOff.play();
        showCameraStatus('BODY CAM OFF?', 2000, true);
      }
    }