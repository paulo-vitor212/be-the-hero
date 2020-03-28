import React from 'react';
import {Feather} from '@expo/vector-icons';
import {View, Image, TouchableOpacity, Text, Linking}  from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import logo from '../../assets/logo.png';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
// import api from '../../services/api';

const Incidents = () => {
    const route = useRoute();
    const incident = route.params.incident;
    const navigation = useNavigation();
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de R$ ${incident.value} `;

    const navigateToDetail = () => {
        navigation.navigate('Incidents');
    }

    const sendWhatsapp = () => {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }
    const sendEmail = () => {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: ['paulovitor2123@gmail.com'],
            body:message
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo}/>
                <TouchableOpacity onPress={navigateToDetail}>
                    <Feather name="arrow-left" size={32} color="#E82041"/>
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}> {incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}> {incident.name}</Text>

                <Text style={styles.incidentProperty}>E-MAIL</Text>
                <Text style={styles.incidentValue}> {incident.email}</Text>

                <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}> R$ {incident.value}</Text>

            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}

export default Incidents;