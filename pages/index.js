import React from 'react';
import Head from 'next/head';
import Hero from '../components/Hero';
import SobreNosotros from '../components/SobreNosotros';
import GaleriaRazas from '../components/GaleriaRazas';
import GaleriaFotos from '../components/GaleriaFotos';
import Testimonios from '../components/Testimonios';
import Contacto from '../components/Contacto';
import Footer from '../components/Footer';
import BotonWhatsApp from '../components/BotonWhatsApp';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>The Candy House - Criadero de Schnauzer Miniatura y Cocker Spaniel Inglés</title>
        <meta name="description" content="Criadero especializado en Schnauzer Miniatura y Cocker Spaniel Inglés en Argentina. Más de 15 años de experiencia en crianza responsable. Cachorros con pedigrí y garantía de salud." />
        <meta name="keywords" content="criadero, schnauzer miniatura, cocker spaniel inglés, cachorros, argentina, pedigrí, crianza responsable" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="The Candy House - Criadero Canino Argentina" />
        <meta property="og:description" content="Cachorros de Schnauzer Miniatura y Cocker Spaniel Inglés con amor y calidad garantizada" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thecandyhouse.com.ar" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://thecandyhouse.com.ar" />
      </Head>

      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <SobreNosotros />
          <GaleriaRazas />
          <GaleriaFotos />
          <Testimonios />
          <Contacto />
        </main>
        <Footer />
        <BotonWhatsApp />
      </div>
    </>
  );
}