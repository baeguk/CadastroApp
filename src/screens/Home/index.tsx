import { useState } from 'react';
import { 
    FlatList, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View,
    Alert,
} from 'react-native';

import { styles } from './styles';
import { Users } from '../../components/Users';

type Props = {
    id: string,
    name: string,
    email: string, 
    city: string,
    cep: string
}

export function Home() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [cep, setCep] = useState('')
    const [users, setUsers] = useState<Props[]>([])
    const [totalUs, setTotalUs] = useState<number>(0)

    function handleAddNewUser() {
        if (name.trim() === '' || email.trim() === '' || city.trim() === '' || cep.trim() === '') {
            return Alert.alert('Usuário', 'Favor preencha os campos')
        }

        const validCities = ['VR', 'VOLTA REDONDA' ,'BM', 'BARRA MANSA', 'BP', 'BARRA DO PIRAI', 'RJ', 'RIO DE JANEIRO', 'SP', 'SAO PAULO', 'PH', 'PINHEIRAL'];
        if (!validCities.includes(city.toUpperCase())){
          return Alert.alert('Usuário', 'Cidade inválida. Entre com  VR, BM, BP, RJ, SP ou PH')
        }

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(String(email).toUpperCase())){
          return Alert.alert('Usuário', 'Preencha o email corretamente')
        }

        const regCep = /^\d{8}$/;
        if (!regCep.test(String(cep))){
          return Alert.alert('Usuário', 'Preencha o cep corretamente')
        }

        const emailRegistered = users.some(user => user.email === email)
        if (emailRegistered) {
          return Alert.alert('Usuário', 'Este email já está cadastrado, tente outro.')
        }



        const data = {
            id: String(new Date().getTime()),
            name,
            email,
            city,
            cep
        }

        setUsers([...users, data])
        setName('')
        setEmail('')
        setCity('')
        setCep('')
        setTotalUs(users.length + 1)
    }

    function handleRemoveUser(id: string) {
      Alert.alert('Remover', 'Remover o usuário', [
        {
          text: 'Sim',
          onPress: () => {
            setUsers(users => 
              users.filter(user => user.id !== id)
            )
            setTotalUs(users.length - 1)
          }
        },
        {
          text: 'Não',
          style: 'cancel'
        }
      ])
    }

    function handleCount() {
      console.log('Total de usuários: ' + totalUs);

      const usersVR = users.filter(user => user.city.toUpperCase() === 'VR'|| user.city.toUpperCase() === 'VOLTA REDONDA').length;
      console.log('Total de usuários em VR: ' + usersVR);

      const usersBmPh = users.filter(user => user.city.toUpperCase() === 'BM' || user.city.toUpperCase() === 'BARRA MANSA' || user.city.toUpperCase() === 'PH' || user.city.toUpperCase() === 'PINHEIRAL').length
      console.log('Total de usuários de BM e/ou PH: ' + usersBmPh) 

      const usersNotBp = users.filter(user => user.city.toUpperCase() !== 'BP' && user.city.toUpperCase() !== 'BARRA DO PIRAI').length
      console.log('Total de usuários que não moram em BP: ' + usersNotBp) 

      alert('Total de usuários: ' + totalUs + '\n' + 'Total de usuários em VR: ' + usersVR + '\n' + 'Total de usuários de BM e/ou PH: ' + usersBmPh + '\n' + 'Total de usuários que não moram em BP: ' + usersNotBp)
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Usuários</Text>

        <View style={styles.form}>
            <TextInput
            style={styles.input}
            placeholder='Nome do usuário'
            placeholderTextColor='#6B6B6B'
            autoCapitalize="words"
            value={name}
            onChangeText={value => setName(value)}
            />
            
            <TextInput
            style={styles.input}
            placeholder='Email do usuário'
            placeholderTextColor='#6B6B6B'
            autoCapitalize="none"
            value={email}
            onChangeText={value => setEmail(value)}
            />
            
            <TextInput
            style={styles.input}
            placeholder='Cidade do usuário'
            placeholderTextColor='#6B6B6B'
            autoCapitalize="words"
            value={city}
            onChangeText={value => setCity(value)}
            />

          <TextInput
            style={styles.input}
            placeholder='CEP do usuário'
            placeholderTextColor='#6B6B6B'
            autoCapitalize="characters"
            value={cep}
            onChangeText={value => setCep(value)}
            />
        </View>

        <TouchableOpacity
        style={styles.button}
        onPress={handleAddNewUser}>
            <Text style={styles.textButton}>
              Incluir
            </Text>
        </TouchableOpacity>

        <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Users
            data={item}
            onRemove={() => handleRemoveUser(item.id)}
          />
        )}
      />
        

        <TouchableOpacity
        style={styles.button}
        onPress={handleCount}>
        <Text 
        style={styles.textButton} 
        >
          Total
        </Text>
      </TouchableOpacity>
      </View>

      
    )
}