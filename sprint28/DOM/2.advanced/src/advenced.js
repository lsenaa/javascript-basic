const folderTemplate = [
  {
    name: '데스크탑',
    file: ['내 컴퓨터', '휴지통'],
    folder: [
      {
        name: 'loop',
        file: ['index.html', 'render.js', 'style.css'],
        folder: [
          {
            name: 'src',
            file: ['stage1.js', 'stage2.js'],
          },
          {
            name: 'data',
            file: ['data.js'],
          },
        ],
      },
      {
        name: 'D-Day-counter',
        file: ['index.html', 'script.js', 'style.css'],
      },
    ],
  },
];

// ! 위의 코드는 Tree를 구성하기 위한 기반 데이터입니다. 참고는 하시되 수정하지 마세요 ! //

const DOM = document.querySelector('body');
const container = document.querySelector('.container');

/**
  * createTree 함수를 완성시켜 폴더 구조(Tree)를 출력하세요. 
  * ! createTree 함수를 완성 시키기 위해서는 재귀(recursion)에 대한 이해가 수반되어야 합니다.
  * 
  * 매개변수 folder에는 트리 구조를 구성하기 위한 기반 데이터가 들어옵니다.
  * 매개변수 node에는 container class를 가진 div 태그가 들어옵니다.
*/

/**
  * ? 재귀함수란, 스스로를 다시 호출하는 함수를 의미합니다.
  * 폴더 구조를 완성하기 위해서는 하위 폴더에 포함된 파일과 폴더에 같은 로직을 반복 적용시켜야 합니다.
  * 이때, 재귀를 활용합니다.
  * 하위 폴더가 존재하는 것을 파악했을 때,
  * 하위 폴더 또한 현재의 폴더가 지닌 데이터와 같은 형태를 지니고 있다고 확신할 수 있을 때는
  * 현재 동작하는 함수를 스스로 재귀 호출해서 같은 로직을 적용해주어야 합니다.
  * 
  * ! 재귀함수는 while()문과 같이 종료 조건이 반드시 필요합니다.
 */

// advanced 과제는 details, summary 태그를 기반으로 css가 구성되어 있습니다. details, summary 태그를 사용하세요!
// details, summary 태그는 HTML5에서 등장한 태그로 토글을 조금 더 간편하게 구현할 수 있도록 도와줍니다.
// details : https://developer.mozilla.org/ko/docs/Web/HTML/Element/details
// summary : https://developer.mozilla.org/ko/docs/Web/HTML/Element/summary

const createTree = function (folder, node) {
  // 여기에서 작업하세요.
};

// ! 아래의 코드는 수정하지 마세요 ! //

createTree(folderTemplate, container);