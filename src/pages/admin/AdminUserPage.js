import { AdminLayout } from "components/layouts";
import { useStep } from "core/hooks";

function AdminUserPage() {
  const { step, changeStep } = useStep();
  return (
    <AdminLayout
      step={step}
      main={
        <div>
          유저 관리
          <br />
          <button onClick={() => changeStep({ step: 1 })}>회원 생성</button>
          <table className="w-full bg-white border table-fixed table-type-a">
            <thead>
              <tr>
                <th>No</th>
                <th>이름</th>
                <th>번호</th>
                <th>생년월일</th>
                <th>전화번호</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>고유진</td>
                <td>10230fnfk1</td>
                <td>950621</td>
                <td>01094285124</td>
              </tr>
              <tr>
                <td>2</td>
                <td>김미현</td>
                <td>10230fnfk1</td>
                <td>950621</td>
                <td>01094285124</td>
              </tr>
              <tr>
                <td>3</td>
                <td>이너른</td>
                <td>10230fnfk1</td>
                <td>950621</td>
                <td>01094285124</td>
              </tr>
              <tr>
                <td>4</td>
                <td>고재범</td>
                <td>10230fnfk1</td>
                <td>950621</td>
                <td>01094285124</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      sub={
        <>
          <div className="min-w-[400px] border-l h-full bg-white">
            유저 생성
            <br />
            <button onClick={() => changeStep({ step: 2 })}>
              펀드 생성하기
            </button>
          </div>
          <div className="min-w-[400px] border-l h-full bg-white">
            유저 펀드 생성
          </div>
        </>
      }
      subTotal={2}
    />
  );
}

export default AdminUserPage;
