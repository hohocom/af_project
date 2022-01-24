function UserDetail({ changeStep, user, openUpdateFormEvent }) {
  return (
    <>
      <div>
        <div className="w-full flex justify-between items-center">
          <h2 className="text-xl font-noto-regular">회원 상세정보</h2>

          <button
            type="button"
            className="text-sm py-2 px-4 rounded-md bg-yellow-400 text-white"
            onClick={openUpdateFormEvent}
          >
            수정
          </button>
        </div>
        <div className="flex flex-col mt-2">
          <p className="font-noto-regular">ID(email)</p>
          <p>{user.email}</p>
        </div>
        <div className="flex flex-col mt-2">
          <p className="font-noto-regular">회원명</p>
          <p>{user.name}</p>
        </div>
        <div className="flex flex-col mt-2">
          <p className="font-noto-regular">생년월일</p>
          <p>{user.birthday}</p>
        </div>
        <div className="flex flex-col mt-2">
          <p className="font-noto-regular">주소</p>
          <p>{user.address}</p>
        </div>
        <div className="flex flex-col mt-2">
          <p className="font-noto-regular">휴대전화번호</p>
          <p>{user.phone}</p>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <div className="flex justify-between items-start">
          <h2 className="font-noto-bold">가입한 펀드목록</h2>
          <button
            onClick={() => changeStep({ step: 2 })}
            className="bg-blue-500 text-white px-2 py-1 rounded-md mb-2 text-sm"
          >
            펀드 추가
          </button>
        </div>

        <table className="table-type-a">
          <thead>
            <tr>
              <th>펀드명</th>
              <th>가입날짜</th>
              <th>가입금액</th>
              <th>지분율</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AF공모주1호</td>
              <td>2021.12.31</td>
              <td>100,000,000</td>
              <td>2.5%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserDetail;
