const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list"); // ul을 가져온다.

const savedTodoList = JSON.parse(localStorage.getItem("saved-items")); // 문자열로 변환된 JSON데이터 타입을 원본 데이터로 변환해준다..
const savedWeatherData = JSON.parse(localStorage.getItem("saved-weather"));

const createTodo = function (storageData) {
  let todoContents = todoInput.value; // value값을 가져온다
  if (storageData) {
    // 매개변수가 들어 왔다면, 컨텐츠를 빼와서 텍스트 컨텐츠를 활용한다.
    todoContents = storageData.contents;
  }

  const newLi = document.createElement("li"); // 태그를 생성한다. (노드 생성)
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  // addEventListener: 직접 생성한 이벤트를 추가해준다. ('추가할 이벤트이름', 추가할 속성)
  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete"); // 버튼 눌렀을때, li태그에 complete라는 새로운 class를 추가해준다. toggle은 클릭할때마다
    saveItemsFn(); // 체크 버튼을 누를때 localstorage 저장을 위해 saveItemsFn 함수를 실행해준다.
  });

  // 더블 클릭시, 태그를 삭제해준다.
  newLi.addEventListener("dblclick", () => {
    newLi.remove();
    saveItemsFn(); // 더블 클릭시에도 local storage를 반영해준다.
  });

  // storageData에 complete가 true라면(취소선이 그어져 있으면), complete 클래스를 추가해준다.
  // 객체 + ? :optional chaining. 객체가 undefined나 다른 값인 경우 체크하지 않는다. (값이 정상인 값일때만 complete를 찾는다.)
  if (storageData?.complete) {
    newLi.classList.add("complete");
  }

  newSpan.textContent = todoContents; // 재할당을 위해 value값을 여기서 가져온다.
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan); // appendChild : 부모 태그에 자식 태그를 추가해준다.
  todoList.appendChild(newLi);
  todoInput.value = ""; // 할 일을 추가한 후 input창을 비워준다.
  saveItemsFn();
};

// input에 입력하고 엔터를 누르면 createTodo함수가 실행된다.
const keyCodeCheck = function () {
  if (window.event.keyCode === 13 && todoInput.value.trim() !== "") {
    // 버튼이 enter이고, input에 빈 값이 아닐 경우(trim으로 공백도 제외)
    createTodo();
  }
};

// 전체삭제 버튼을 클릭하면 모든 태그들을 삭제한다.
const deleteAll = function () {
  const liList = document.querySelectorAll("li"); // querySelectorAll : 해당 태그들을 모두 가져온 후 배열에 담아준다.
  // 반복문으로 liList 배열 요소에 접근하여 모든 태그들을 삭제해준다.
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
  saveItemsFn();
};

////// Local storage //////
const saveItemsFn = function () {
  const saveItems = [];
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector("span").textContent,
      complete: todoList.children[i].classList.contains("complete"), // 주어진 li태그들 안에 complete 클래스가 존재하는지 확인
    };
    saveItems.push(todoObj);
  }

  // 삼항연산자) 조건이 성립하는 경우 ? 뒤에 코드가 실행되고, 아닌 경우 : 뒤에 코드가 실행된다.
  saveItems.length === 0
    ? localStorage.removeItem("saved-items")
    : localStorage.setItem("saved-items", JSON.stringify(saveItems));

  //   // 빈 배열일 경우, 데이터를 삭제해준다.
  //   if (saveItems.length === 0) {
  //     localStorage.removeItem("saved-items");
  //   } else {
  //     // 빈 배열이 아닐 경우, local storage에 배열을 저장해준다.
  //     localStorage.setItem("saved-items", JSON.stringify(saveItems)); // JSON.stringify : 배열 및 객체를 문자열로 변환해준다. (JSON 데이터 타입)
  //   }
};

if (savedTodoList) {
  // storage데이터가 있다면,
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}

///////// geolocation //////////

// 사용자 지역,날씨 데이터를 가져와 화면에 보여준다.
const weatherDataActive = function ({ location, weather }) {
  const weatherMainList = [
    "Clear",
    "Clouds",
    "Drizzle",
    "Rain",
    "Snow",
    "Thunderstorm",
  ];
  weather = weatherMainList.includes(weather) ? weather : "Fog"; // 데이터와 날씨가 일치하지 않으면, Fog이미지를 보여준다.
  const locationNameTag = document.querySelector("#location-name-tag");
  locationNameTag.textContent = location;
  document.body.style.backgroundImage = `url('./images/${weather}.jpg')`;

  // 현재 저장된 데이터가 없거나, 이전 데이터와 현재 데이터가 다르다면, local storage에 저장한다.(불필요한 데이터가 local storage에 저장되지 않도록 한다.)
  if (
    !savedWeatherData ||
    savedWeatherData.location !== location ||
    savedWeatherData.weather !== weather
  ) {
    localStorage.setItem(
      "saved-weather",
      JSON.stringify({ location, weather })
    );
  }
};

// fetch()로 api 날씨 데이터를 요청한다.
const weatherSearch = function ({ latitude, longitude }) {
  const openWeatherRes = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6e4156321be59bb41e4d87c59486dbd9`
  )
    .then((res) => {
      return res.json(); // 응답 헤더가 존재할 경우 json()을 사용한다. JSON.parse는 응답 바디만 존재할때 사용한다.
    })
    .then((json) => {
      // 지역이름, 날씨를 가져온다.
      const weatherData = {
        location: json.name,
        weather: json.weather[0].main,
      };
      weatherDataActive(weatherData);
    })
    .catch((err) => {
      // catch: 에러 발생 시 요청이 제대로 이루어 지지 않은 원인을 확인할 수 있다.
      console.log(err);
    });
};

// 위도, 경도 데이터를 가져와 객체에 저장한다. 구조분해할당(position의 coords 값만 가져온다.)
const accessToGeo = function ({ coords }) {
  // 구조분해할당 (latitude, longitude)
  const { latitude, longitude } = coords;
  const positionObj = {
    // shorthand property: 객체의 키와 값의 이름이 같다면 한번만 작성해도 된다.
    latitude,
    longitude,
  };

  weatherSearch(positionObj);
};

const askForLocation = function () {
  navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
    //err: 두번째 콜백함수. 접근하지 못할 경우 에러가 발생한다.
  });
};
askForLocation();

if (savedWeatherData) {
  weatherDataActive(savedWeatherData);
}
