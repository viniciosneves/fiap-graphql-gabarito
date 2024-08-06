import { useState } from "react"
import { Card, Form, Heading, Input, Label, Select } from "./styles"
import { Button } from "../Button"
import { useMutation, useQuery } from "@apollo/client"
import { GET_TRANSACTION_TYPES } from "../../queries/transactionTypes"
import { ADD_TRANSACTION } from "../../mutations/addTransaction"

export const TransactionForm = () => {

    const [transactionType, setTransactionType] = useState('')
    const [transactionValue, setSetTransactionValue] = useState('')

    const { data } = useQuery(GET_TRANSACTION_TYPES);
    
    const [addTransaction] = useMutation(ADD_TRANSACTION, {
        onCompleted: () => {
            setTransactionType('')
            setSetTransactionValue('')
        }
    });

    const createTransacion = (evt) => {
        evt.preventDefault()
        addTransaction({
            variables: {
                input: {
                    value: parseFloat(transactionValue),
                    type: transactionType
                }
            }
        })
    }


    return (
        <Card>
            <Heading>
                Nova transação
            </Heading>
            <Form onSubmit={createTransacion}>
                <Select     
                    value={transactionType} 
                    required
                    onChange={evt => setTransactionType(evt.target.value)}
                >
                    <option value="" disabled hidden>
                        Selecione o tipo de transação
                    </option>
                    {data?.getTransactionTypes?.map(t => <option key={t.value} value={t.value} >{t.display}</option>)}
                </Select>
                <div>
                    <Label>
                        Valor
                    </Label>
                    <Input 
                        placeholder="00,00" 
                        type="number"
                        value={transactionValue}
                        onChange={evt => setSetTransactionValue(evt.target.value)}
                        required
                    />
                </div>
                <Button>
                    Concluir transação
                </Button>
            </Form>
        </Card>
    )
}