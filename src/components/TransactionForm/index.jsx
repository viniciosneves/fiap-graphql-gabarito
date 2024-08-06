import { useState } from "react"
import { Card, Form, Heading, Input, Label, Select } from "./styles"
import { Button } from "../Button"
import { useQuery } from "@apollo/client"
import { GET_TRANSACTION_TYPES } from "../../queries/transactionTypes"

export const TransactionForm = () => {

    const [transactionType, setTransactionType] = useState('')
    const { data } = useQuery(GET_TRANSACTION_TYPES);
    
    return (
        <Card>
            <Heading>
                Nova transação
            </Heading>
            <Form>
                <Select     
                    value={transactionType} 
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
                    <Input placeholder="00,00" type="number"/>
                </div>
                <Button>
                    Concluir transação
                </Button>
            </Form>
        </Card>
    )
}