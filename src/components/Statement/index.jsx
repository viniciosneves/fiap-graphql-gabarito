import PropTypes from 'prop-types';
import { Transaction } from "../Transaction";
import { Container, Heading, TransactionsList } from "./styles";

export const Statement = ({ transactions }) => {
    return (
        <Container>
            <Heading>Extrato</Heading>
            <TransactionsList>
                {transactions.map(transaction => (
                    <Transaction key={transaction.id} transaction={transaction} />
                ))}
            </TransactionsList>
        </Container>
    );
};

Statement.propTypes = {
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            date: PropTypes.instanceOf(Date).isRequired,
        })
    ),
};