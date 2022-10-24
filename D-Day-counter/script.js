const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");
const savedDate = localStorage.getItem("saved-date"); // 가져오고 싶은 데이터의 key를 입력해준다.

const intervalIdArr = [];

container.style.display = "none";
messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>"; // innerHTML: 내부 html태그 추가

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;

  return dateFormat;
};

const counterMaker = function (data) {
  if (data !== savedDate) {
    //input 데이터와 savedDate가 다를때 (새로운 데이터가 들어올 때)
    localStorage.setItem("saved-date", data); // local storage로 저장한다.
  }
  const nowDate = new Date(); // 현재 시간
  const targetDate = new Date(data).setHours(0, 0, 0, 0); // 구하려는 D-day 날짜. setHours는 시간대 변경
  const remaining = (targetDate - nowDate) / 1000; // D-day 까지의 남은 시간(초)

  if (remaining <= 0) {
    // 만약, remaining이 0이거나 음수라면, 타이머가 종료되었습니다. 출력
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval(); // 불필요한 반복을 종료시킨다.
    return; // 조건이 맞다면 return으로 불필요한 연산을 줄이기 위해 함수를 종료시켜준다.
  } else if (isNaN(remaining)) {
    // 만약, 잘못된 날짜가 입력되었다면, 유효한 시간대가 아닙니다. 출력
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  }

  // 객체로 변경
  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHours: Math.floor(remaining / 3600) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60,
  };

  // 반복문으로 변경
  const documentArr = ["days", "hours", "min", "sec"];
  const timeKeys = Object.keys(remainingObj);

  const format = function (time) {
    // 남은 시간이 한자리수라면 0을 붙인다.
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  let i = 0;
  for (tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }
};

// 타이머 시작
const starter = function (targetDateInput) {
  if (!targetDateInput) {
    // targetDateInput이 undefined라면
    targetDateInput = dateFormMaker();
  }

  // const targetDateInput = dateFormMaker(); // 버튼 누를 당시의 input 데이터
  container.style.display = "flex";
  messageContainer.style.display = "none";
  setClearInterval(); // 버튼을 다시 누르면 기존에 존재하던 인터벌을 삭제한다.
  counterMaker(targetDateInput); // 버튼을 누르자마자 함수를 실행시킨다.
  // 카운터 작동 - 1초마다 counterMaker 함수를 실행시킨다.
  const intervalId = setInterval(() => {
    counterMaker(targetDateInput);
  }, 1000); // 인터벌마다 고유한 id값을 가진다 / 인자가 있는 함수를 받을 때는 익명함수가 필요하다.
  intervalIdArr.push(intervalId);
};

// 타이머 초기화
const setClearInterval = function () {
  localStorage.removeItem("saved-date");
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = function () {
  container.style.display = "none";
  messageContainer.style.display = "flex";
  messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";
  setClearInterval();
};

// 화면이 실행되자마자 local stage의 데이터 유무를 파악한다. (truthy한 데이터)
if (savedDate) {
  starter(savedDate);
} else {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
}
