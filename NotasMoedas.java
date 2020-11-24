/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author jarbasfito
 */

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Scanner;

public class NotasMoedas {
 
    public static void main(String[] args) {
 
        Scanner leitor = new Scanner(System.in);
        
       
       double valor;
       int n100 = 0, n50 = 0, n20 = 0, n10 = 0, n5 = 0, n2 = 0, m1 = 0, m50 = 0, m25 = 0, m10 = 0, m05 = 0, m01 = 0;  
       
       valor = leitor.nextDouble();
       
       BigDecimal arredonda = new BigDecimal(valor).setScale(2, RoundingMode.HALF_EVEN);
       
       System.out.println("valor lido inicialmente " + valor);
      
       while (valor >= 100){
           valor = valor - 100;
           System.out.println("valor nota 1 - " + valor);
           n100++;
       }
       
       while (valor >= 50){
           valor = valor - 50;
           
           System.out.println("valor nota 2 - " + arredonda.doubleValue());
           n50++;
       } 
       
       while (valor >= 20){
           valor = valor - 20;
           System.out.println("valor nota 3 - " + valor);
           n20++;
       }
      
       while (valor >= 10){
           valor = valor - 10;
           System.out.println("valor nota 4 - " + valor);
           n10++;
       }
       
       while (valor >= 5){
           valor = valor - 5;
           System.out.println("valor nota 5 - " + valor);
           n5++;
       }
       
       while (valor >= 2){
           valor = valor - 2;
           System.out.println("valor nota  6 - " + valor);
           n2++;
       }
       
       while (valor >= 1){
           valor = valor - 1;
           //System.out.println("valor moeda 1 - " + valor);
           m1++;
       }
       
       while (valor >= 0.50){
           valor = valor - 0.50;
           //System.out.println("valor moeda 2 - " + valor);
           m50++;
       }
       
       while (valor >= 0.25){
           valor = valor - 0.25;
           //System.out.println("valor moeda 3 - " + valor);
           m25++;
       }
       
       while (valor >= 0.10){
           //valor = valor - 0.10;
           //System.out.println("valor moeda 4 - " + valor);
           m10++;
       }
       
       while (valor >= 0.05){
           valor = valor - 0.05;
           //System.out.println("valor moeda 5 - " + valor);
           m05++;           
       }
       
       while (valor >= 0.01){
           valor = valor - 0.01;
           //System.out.println("valor moeda 6 - " + valor);
           m01++;
       }
       
        System.out.println("NOTAS:");
        System.out.println(n100 + " nota(s) de R$ 100.00");
        System.out.println(n50 + " nota(s) de R$ 50.00");
        System.out.println(n20 + " nota(s) de R$ 20.00");
        System.out.println(n10 + " nota(s) de R$ 10.00");
        System.out.println(n5 + " nota(s) de R$ 5.00");
        System.out.println(n2 + " nota(s) de R$ 2.00");
        System.out.println("MOEDAS:");
        System.out.println(m1 + " moeda(s) de R$ 1.00");
        System.out.println(m50 + " moeda(s) de R$ 0.50");
        System.out.println(m25 + " moeda(s) de R$ 0.25");
        System.out.println(m10 + " moeda(s) de R$ 0.10");
        System.out.println(m05 + " moeda(s) de R$ 0.05");
        System.out.println(m01 + " moeda(s) de R$ 0.01");
 
    }
 
}
