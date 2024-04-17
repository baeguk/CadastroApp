import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#535C91'
    },
    title: {
        color: '#FDFCFE',
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 20
    },
    input: {
        height: 56,
        backgroundColor: '#1F1E25',
        color: '#FFF',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10
    },
    form : {
        width: '100%',
        flexDirection: 'column',
        marginTop: 22,
        marginBottom: 18
    },
    button: {
        backgroundColor: '#070F2B',
        color: '#FFF',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    textButton: {
        color: '#FFF',
        fontSize: 20
    },
})