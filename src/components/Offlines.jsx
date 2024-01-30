import { Offline } from 'react-detect-offline';
import { Alert } from 'antd';

export default function Offlines() {
  <Offline>
    <div className="app">
      <Alert message="Отстутствует подключение к интернету" type="error" />
    </div>
  </Offline>;
}
