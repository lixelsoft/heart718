


export const inputNumberAutoComma = (data) => {
  const inputNumberRemoveComma = (str) => {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  }
  const inputNumberWithComma = (str) => {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }

  // 콤마( , )의 경우도 문자로 인식되기때문에 콤마를 따로 제거한다.
  let deleteComma = data.replace(/\,/g, "");

  // 콤마( , )를 제외하고 문자가 입력되었는지를 확인한다.
  if(isFinite(deleteComma) == false) {
      alert("문자는 입력하실 수 없습니다.");
      data = "";
      return false;
  }

  // 기존에 들어가있던 콤마( , )를 제거한 이 후의 입력값에 다시 콤마( , )를 삽입한다.
  return inputNumberWithComma(inputNumberRemoveComma(data));
}

export const  numberToKorean = (number) => {
  var inputNumber  = number < 0 ? false : number;
  var unitWords    = ['', '만', '억', '조', '경'];
  var splitUnit    = 10000;
  var splitCount   = unitWords.length;
  var resultArray  = [];
  var resultString = '';

  for (var i = 0; i < splitCount; i++){
    var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0){
        resultArray[i] = unitResult;
    }
  }

  for (var i = 0; i < resultArray.length; i++){
    if(!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }

  return resultString;
}