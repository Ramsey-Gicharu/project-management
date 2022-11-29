
import { Card, Grid, Typography } from 'antd'
import { Header } from 'antd/es/layout/layout';
const { Title } = Typography;

const Navbar = () => {
  return (
    <div>
      <Header>
        <Card>
          <Title type="primary" align="center" level={3}>TASK MANAGEMENT APPLICATION</Title>
        </Card>

      </Header>



    </div>
  )
}

export default Navbar