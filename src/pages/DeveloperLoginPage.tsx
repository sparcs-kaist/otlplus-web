import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { appBoundClassNames as classNames } from '@/common/boundClassNames';

const DeveloperLoginPage = () => {
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (studentId) {
      localStorage.setItem('devStudentId', studentId);
      axios.defaults.headers.common['X-AUTH-SID'] = studentId;
      navigate('/', { replace: true });
      window.location.reload();
    } else {
      alert('학번을 입력해주세요.');
    }
  };

  return (
    <section className={classNames('content')}>
      <div className={classNames('page-grid', 'page-grid--full')}>
        <div className={classNames('section')}>
          <div className={classNames('subsection', 'subsection--developer-login')}>
            <div className={classNames('title')}>Dev 로그인</div>
            <div className={classNames('input-group')}>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="학번 입력"
                className={classNames('input-field')}
              />
              <button onClick={handleSubmit} className={classNames('button')}>
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperLoginPage;
