import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image , TouchableOpacity } from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;
let dd = 0;
export default function App() {
  const [numero, setNumero] = useState('00:00:00');
  const [botao , setBotao ] = useState('VAI');
  const [ultimo, setUltimo] = useState(null);

  function vai(){
    if(timer !== null){
      clearInterval(timer);
      timer = null;
      setBotao('VAI'); 
    }else{

      timer = setInterval(()=>{
        ss++;
        if (ss == 60){
          ss = 0;
          mm++;
        }
        if (mm == 60){
          mm = 0;
          hh++;
        }
        if(hh == 24){
          hh = 0;
          dd++;
        } 

        let format =
        (hh < 10 ? '0' + hh : hh) + ':'
        + (mm < 10 ? '0' + mm : mm) + ':'
        + (ss < 10 ? '0' + ss : ss);

        setNumero(format); 
      },100);
      setBotao('PARAR');
    }
  }
      
  function parar(){
    if(timer !== null){
      clearTimeout(timer);
      timer = null;      
    }
    setUltimo(numero);
    setNumero('00:00:00');
    ss = 0;
    mm = 0;
    hh = 0; 
    dd = 0;
    setBotao('VAI');
  }
  return (
    <View style={styles.container}>      
      <Image source={require('./src/crono.png')}/>
      <Text style={styles.timer}>{numero}</Text>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={vai}>
           <Text style={styles.btnTexto}>{botao}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={parar}>
           <Text style={styles.btnTexto}>Zerar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.areaUltima}>
         <Text style={styles.ultimoTempo}>
             { ultimo ? 'Ultimo tempo: '+ ultimo : ''}
         </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aaef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer :{
    color: 'white',
    marginTop: -160,
    fontSize :45,
  },
  btnArea:{
    flexDirection:'row',
    marginTop: 120,
    height:40,
  },
  btn:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:  '#FFF',
    height: 40,
    margin: 15,
    borderRadius: 9,
  },
  btnTexto:{
     fontSize: 20,
     fontWeight: 'bold',
     color: '#00aaef',
  },
  areaUltima:{
     marginTop:40,
  },
  ultimoTempo:{
    fontSize: 20,
    color: '#FFF',
    fontStyle:'italic',
  }


});
