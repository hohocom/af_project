function useValidate() {
  // 이메일 정규식
  const emailExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const emailCheck = (e) => {
    const value = e.target.value;

    console.debug(emailExp.test(value));
    console.debug(value);
  };

  return {
    emailCheck,
  };
}

export default useValidate;
