import styled from 'styled-components';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Account } from './components/Account';
import { TransactionForm } from './components/TransactionForm';
import { Statement } from './components/Statement';
import { useQuery } from '@apollo/client';
import { GET_ACCOUNT } from './queries/account';

const Container = styled.div`
  display: flex;
  gap: 24px;
  width: 1200px;
  margin: 24px auto;
`;

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 34px;
`;


function App() {
  const { data } = useQuery(GET_ACCOUNT);

  const transactions = data?.account.transactions.map(transaction => ({
    id: transaction._id,
    type: transaction.type,
    value: transaction.value,
    date: new Date(transaction.createdAt)
  })) || [];

  const balance = data?.account.balance || 0;

  return (
    <>
      <Header />
      <Container>
        <Sidebar />
        <Main>
          <Account balance={balance} />
          <TransactionForm />
        </Main>
        <div>
          <Statement transactions={transactions} />
        </div>
      </Container>
    </>
  );
}

export default App;