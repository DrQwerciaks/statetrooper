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
    let mediaRecorder;
    let recordedChunks = [];
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
          officerElement.play().catch(e => console.log('Autoplay zablokowany:', e));
        }, duration);
        
        setTimeout(() => {
          statusElement.classList.add('hidden');
          statusElement.classList.remove('shake');
          officerElement.classList.add('hidden');
          officerElement.classList.remove('officer-appear', 'officer-shake');
          officerElement.pause();
        }, duration + 3000);
      } else {
        setTimeout(() => {
          statusElement.classList.add('hidden');
          statusElement.classList.remove('shake');
        }, duration);
      }
    }

    function startRecording() {
      recordedChunks = [];
      mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      
      mediaRecorder.ondataavailable = function(event) {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = function() {
        downloadRecording();
      };
      
      mediaRecorder.start();
    }
    
    function downloadRecording() {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const now = new Date();
      const timestamp = now.getFullYear() + '-' + 
                       String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                       String(now.getDate()).padStart(2, '0') + '_' + 
                       String(now.getHours()).padStart(2, '0') + '-' + 
                       String(now.getMinutes()).padStart(2, '0') + '-' + 
                       String(now.getSeconds()).padStart(2, '0');
      
      a.style.display = 'none';
      a.href = url;
      a.download = `bodycam_nagranie_${timestamp}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        video.srcObject = stream;
        soundOn.play();
        showCameraStatus('BODY CAM ON');
        startRecording();
      } catch (err) {
        console.error("Błąd dostępu do kamerki:", err);
      }
    }

    function stopCamera() {
      if (stream) {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
        
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        soundOff.play();
        showCameraStatus('BODY CAM WHO?', 2000, true);
      }
    }

    function playRomaMeme() {
      const romaContainer = document.getElementById('romaContainer');
      const romaMeme = document.getElementById('romaMeme');
      
      romaContainer.classList.remove('hidden');
      romaMeme.currentTime = 0;
      romaMeme.play().catch(e => console.log('Autoplay zablokowany:', e));
      
      romaMeme.onended = function() {
        closeRomaMeme();
      };
    }
    
    function closeRomaMeme() {
      const romaContainer = document.getElementById('romaContainer');
      const romaMeme = document.getElementById('romaMeme');
      
      romaMeme.pause();
      romaContainer.classList.add('hidden');
    }
    
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        const romaContainer = document.getElementById('romaContainer');
        if (!romaContainer.classList.contains('hidden')) {
          closeRomaMeme();
        }
      }
    });