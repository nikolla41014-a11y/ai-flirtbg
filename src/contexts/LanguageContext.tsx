import { createContext, useContext, useState, ReactNode } from "react";

type Language = "bg" | "en" | "es" | "tr" | "it" | "de" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  bg: {
    // Currency
    "currency": "лв",
    
    // Age Verification
    "age.title": "18+ Потвърждение",
    "age.description": "Този сайт съдържа съдържание само за възрастни. Моля, потвърдете, че сте навършили 18 години.",
    "age.confirm": "Потвърждавам - Навършил/а съм 18 години",
    "age.notice": "С натискането на бутона потвърждавате, че сте навършили пълнолетие.",
    "age.privacyLink": "Прочетете нашата Политика за поверителност",
    
    // Main Header
    "header.title": "AI Flirt",
    "header.subtitle": "Избери своя виртуален партньор и започни романтичен разговор. Упражнявай флирт уменията си с AI и се забавлявай! 💕",
    
    // Pricing Section
    "pricing.title": "Избери своя AI партньор",
    "pricing.subtitle": "Започни романтично приключение с AI партньор по твой избор",
    "pricing.girlfriends": "AI Girlfriends 💖",
    "pricing.boyfriends": "AI Boyfriends 💙",
    "pricing.select": "Избери",
    "pricing.createOwn": "Създай своя",
    
    // Partner Names
    "partner.andrea.name": "Андреа",
    "partner.desita.name": "Десита",
    "partner.simeon.name": "Симеон",
    "partner.nikola.name": "Никола",
    "partner.mia.name": "Миа",
    "partner.lora.name": "Лора",
    "partner.ana.name": "Ана",
    
    // Partner Descriptions
    "partner.andrea.desc": "Енергична и забавна, обожава приключенията и дълбоките разговори. Винаги е готова да те разсмее! 😊",
    "partner.desita.desc": "Мокра съм, искам го. Пиши ми 💦",
    "partner.simeon.desc": "Интелигентен и чаровен, обича дълбоките разговори и романтичните жестове. Перфектният джентълмен! 😎",
    "partner.nikola.desc": "Искам да ти го вкарам, пиши ми 😛",
    "partner.mia.desc": "Чувствена и игрива, обича да флиртува и да води страстни разговори. Никога не е скучно с нея! 💋",
    "partner.lora.desc": "Готова съм за теб.",
    "partner.ana.desc": "пълен пакет. Girlfriend expirience",
    "partner.custom.girlfriend": "Качи снимка и избери име за своята перфектна AI Girlfriend! 🎨",
    "partner.custom.boyfriend": "Качи снимка и избери име за своя перфектен AI Boyfriend! 🎨",
    "partner.custom.personalized": "Твоя персонализиран AI партньор ✨",
    
    // Features
    "features.realistic.title": "Реалистични разговори",
    "features.realistic.desc": "Флиртувай като с истински партньор",
    "features.improve.title": "Подобри уменията си",
    "features.improve.desc": "Научи как да впечатляваш",
    "features.fun.title": "Забавлявай се",
    "features.fun.desc": "Романтични и пикантни моменти",
    
    // Description
    "desc.line1": "💌 Разговори за всичко – от сладки комплименти до леко закачливи и пикантни моменти.",
    "desc.line2": "💖 Подобри уменията си във флирта – научи как да водиш интересни разговори и да впечатляваш.",
    "desc.line3": "📸 Персонализирани AI профили – избери своя виртуален партньор с красиви генерирани снимки.",
    "desc.line4": "🎯 Тренирай уверено – когато дойде момента в реалния живот, ще си подготвен.",
    "desc.footer": "AI Flirt – практикувай, флиртувай и се забавлявай с виртуалния си партньор!",
    
    // Custom Partner Dialog
    "custom.title.girlfriend": "Създай своя AI Girlfriend",
    "custom.title.boyfriend": "Създай своя AI Boyfriend",
    "custom.upload": "Качи снимка",
    "custom.name": "Име на партньора",
    "custom.create": "Създай",
    "custom.cancel": "Отказ",
    
    // Flirt Coach
    "flirtcoach.title": "Flirt Coach 🎯",
    "flirtcoach.subtitle": "Чудиш се как да започнеш или продължиш разговор? Flirt Coach е твоят AI треньор за уверен флирт и чар! Започни сега и впечатлявай лесно! 🎯",
    "flirtcoach.name": "Flirt Coach",
    "flirtcoach.description": "Твоят личен AI треньор за флирт и комуникация",
    "flirtcoach.feature1": "Персонални съвети за флирт",
    "flirtcoach.feature2": "Анализ на разговори",
    "flirtcoach.feature3": "Практически упражнения",
    "flirtcoach.startChat": "Започни тренировка",
  },
  en: {
    // Currency
    "currency": "€",
    
    // Age Verification
    "age.title": "18+ Verification",
    "age.description": "This site contains adult content. Please confirm that you are 18 years or older.",
    "age.confirm": "I confirm - I am 18 years or older",
    "age.notice": "By clicking the button you confirm that you have reached the age of majority.",
    "age.privacyLink": "Read our Privacy Policy",
    
    // Main Header
    "header.title": "AI Flirt",
    "header.subtitle": "Choose your virtual partner and start a romantic conversation. Practice your flirting skills with AI and have fun! 💕",
    
    // Pricing Section
    "pricing.title": "Choose Your AI Partner",
    "pricing.subtitle": "Start a romantic adventure with your chosen AI partner",
    "pricing.girlfriends": "AI Girlfriends 💖",
    "pricing.boyfriends": "AI Boyfriends 💙",
    "pricing.select": "Select",
    "pricing.createOwn": "Create Your Own",
    
    // Partner Names
    "partner.andrea.name": "Andrea",
    "partner.desita.name": "Desita",
    "partner.simeon.name": "Simeon",
    "partner.nikola.name": "Nikola",
    "partner.mia.name": "Mia",
    "partner.lora.name": "Lora",
    "partner.ana.name": "Ana",
    
    // Partner Descriptions
    "partner.andrea.desc": "Energetic and fun, loves adventures and deep conversations. Always ready to make you laugh! 😊",
    "partner.desita.desc": "I'm wet, I want it. Text me 💦",
    "partner.simeon.desc": "Intelligent and charming, loves deep conversations and romantic gestures. The perfect gentleman! 😎",
    "partner.nikola.desc": "I want to put it in you, text me 😛",
    "partner.mia.desc": "Sensual and playful, loves to flirt and have passionate conversations. Never boring with her! 💋",
    "partner.lora.desc": "Ready for you.",
    "partner.ana.desc": "Full package. Girlfriend experience",
    "partner.custom.girlfriend": "Upload a photo and choose a name for your perfect AI Girlfriend! 🎨",
    "partner.custom.boyfriend": "Upload a photo and choose a name for your perfect AI Boyfriend! 🎨",
    "partner.custom.personalized": "Your personalized AI partner ✨",
    
    // Features
    "features.realistic.title": "Realistic Conversations",
    "features.realistic.desc": "Flirt like with a real partner",
    "features.improve.title": "Improve Your Skills",
    "features.improve.desc": "Learn how to impress",
    "features.fun.title": "Have Fun",
    "features.fun.desc": "Romantic and spicy moments",
    
    // Description
    "desc.line1": "💌 Conversations about everything – from sweet compliments to slightly teasing and spicy moments.",
    "desc.line2": "💖 Improve your flirting skills – learn how to have interesting conversations and impress.",
    "desc.line3": "📸 Personalized AI profiles – choose your virtual partner with beautiful generated photos.",
    "desc.line4": "🎯 Train confidently – when the moment comes in real life, you'll be prepared.",
    "desc.footer": "AI Flirt – practice, flirt, and have fun with your virtual partner!",
    
    // Custom Partner Dialog
    "custom.title.girlfriend": "Create Your AI Girlfriend",
    "custom.title.boyfriend": "Create Your AI Boyfriend",
    "custom.upload": "Upload Photo",
    "custom.name": "Partner Name",
    "custom.create": "Create",
    "custom.cancel": "Cancel",
    
    // Flirt Coach
    "flirtcoach.title": "Flirt Coach 🎯",
    "flirtcoach.subtitle": "Improve your flirting skills with AI coach",
    "flirtcoach.name": "Flirt Coach",
    "flirtcoach.description": "Your personal AI coach for flirting and communication",
    "flirtcoach.feature1": "Personalized flirting tips",
    "flirtcoach.feature2": "Conversation analysis",
    "flirtcoach.feature3": "Practice exercises",
    "flirtcoach.startChat": "Start Training",
  },
  es: {
    // Currency
    "currency": "€",
    
    // Age Verification
    "age.title": "Verificación 18+",
    "age.description": "Este sitio contiene contenido para adultos. Por favor, confirme que tiene 18 años o más.",
    "age.confirm": "Confirmo - Tengo 18 años o más",
    "age.notice": "Al hacer clic en el botón, confirmas que has alcanzado la mayoría de edad.",
    "age.privacyLink": "Lea nuestra Política de Privacidad",
    
    // Main Header
    "header.title": "AI Flirt",
    "header.subtitle": "Elige tu pareja virtual y comienza una conversación romántica. ¡Practica tus habilidades de coqueteo con IA y diviértete! 💕",
    
    // Pricing Section
    "pricing.title": "Elige Tu Pareja IA",
    "pricing.subtitle": "Comienza una aventura romántica con tu pareja IA elegida",
    "pricing.girlfriends": "AI Novias 💖",
    "pricing.boyfriends": "AI Novios 💙",
    "pricing.select": "Seleccionar",
    "pricing.createOwn": "Crea Tu Propia",
    
    // Partner Names
    "partner.andrea.name": "Andrea",
    "partner.desita.name": "Desita",
    "partner.simeon.name": "Simeon",
    "partner.nikola.name": "Nikola",
    "partner.mia.name": "Mia",
    "partner.lora.name": "Lora",
    "partner.ana.name": "Ana",
    
    // Partner Descriptions
    "partner.andrea.desc": "Enérgica y divertida, ama las aventuras y las conversaciones profundas. ¡Siempre lista para hacerte reír! 😊",
    "partner.desita.desc": "Estoy mojada, lo quiero. Escríbeme 💦",
    "partner.simeon.desc": "Inteligente y encantador, ama las conversaciones profundas y los gestos románticos. ¡El caballero perfecto! 😎",
    "partner.nikola.desc": "Quiero metértela, escríbeme 😛",
    "partner.mia.desc": "Sensual y juguetona, le encanta coquetear y tener conversaciones apasionadas. ¡Nunca es aburrido con ella! 💋",
    "partner.lora.desc": "Lista para ti.",
    "partner.ana.desc": "Paquete completo. Experiencia de novia",
    "partner.custom.girlfriend": "¡Sube una foto y elige un nombre para tu AI Novia perfecta! 🎨",
    "partner.custom.boyfriend": "¡Sube una foto y elige un nombre para tu AI Novio perfecto! 🎨",
    "partner.custom.personalized": "Tu pareja IA personalizada ✨",
    
    // Features
    "features.realistic.title": "Conversaciones Realistas",
    "features.realistic.desc": "Coquetea como con una pareja real",
    "features.improve.title": "Mejora Tus Habilidades",
    "features.improve.desc": "Aprende cómo impresionar",
    "features.fun.title": "Diviértete",
    "features.fun.desc": "Momentos románticos y picantes",
    
    // Description
    "desc.line1": "💌 Conversaciones sobre todo – desde cumplidos dulces hasta momentos ligeramente provocativos y picantes.",
    "desc.line2": "💖 Mejora tus habilidades de coqueteo – aprende cómo tener conversaciones interesantes e impresionar.",
    "desc.line3": "📸 Perfiles IA personalizados – elige tu pareja virtual con hermosas fotos generadas.",
    "desc.line4": "🎯 Entrena con confianza – cuando llegue el momento en la vida real, estarás preparado.",
    "desc.footer": "AI Flirt – ¡practica, coquetea y diviértete con tu pareja virtual!",
    
    // Custom Partner Dialog
    "custom.title.girlfriend": "Crea Tu AI Novia",
    "custom.title.boyfriend": "Crea Tu AI Novio",
    "custom.upload": "Subir Foto",
    "custom.name": "Nombre de Pareja",
    "custom.create": "Crear",
    "custom.cancel": "Cancelar",
    
    // Flirt Coach
    "flirtcoach.title": "Flirt Coach 🎯",
    "flirtcoach.subtitle": "Mejora tus habilidades de coqueteo con un coach IA",
    "flirtcoach.name": "Flirt Coach",
    "flirtcoach.description": "Tu coach personal de IA para coquetear y comunicarte",
    "flirtcoach.feature1": "Consejos personalizados de coqueteo",
    "flirtcoach.feature2": "Análisis de conversaciones",
    "flirtcoach.feature3": "Ejercicios prácticos",
    "flirtcoach.startChat": "Comenzar Entrenamiento",
  },
  tr: {
    // Currency
    "currency": "€",

    // Age Verification
    "age.title": "18+ Doğrulama",
    "age.description": "Bu site yetişkin içeriği içermektedir. Lütfen 18 yaşında veya daha büyük olduğunuzu onaylayın.",
    "age.confirm": "Onaylıyorum - 18 yaşında veya daha büyüğüm",
    "age.notice": "Butona tıklayarak reşit olduğunuzu onaylamış olursunuz.",
    "age.privacyLink": "Gizlilik Politikamızı Okuyun",

    // Main Header
    "header.title": "AI Flirt",
    "header.subtitle": "Sanal partnerinizi seçin ve romantik bir sohbete başlayın. Yapay zeka ile flört becerilerinizi geliştirin ve eğlenin! 💕",

    // Pricing Section
    "pricing.title": "Yapay Zeka Partnerinizi Seçin",
    "pricing.subtitle": "Seçtiğiniz yapay zeka partnerinizle romantik bir maceraya başlayın",
    "pricing.girlfriends": "AI Kız Arkadaşlar 💖",
    "pricing.boyfriends": "AI Erkek Arkadaşlar 💙",
    "pricing.select": "Seç",
    "pricing.createOwn": "Kendiniz Oluşturun",

    // Partner Names
    "partner.andrea.name": "Andrea",
    "partner.desita.name": "Desita",
    "partner.simeon.name": "Simeon",
    "partner.nikola.name": "Nikola",
    "partner.mia.name": "Mia",
    "partner.lora.name": "Lora",
    "partner.ana.name": "Ana",

    // Partner Descriptions
    "partner.andrea.desc": "Enerjik ve eğlenceli, maceraları ve derin sohbetleri seviyor. Sizi her zaman güldürmeye hazır! 😊",
    "partner.desita.desc": "Islağım, istiyorum. Bana yaz 💦",
    "partner.simeon.desc": "Zeki ve çekici, derin sohbetleri ve romantik jestleri seviyor. Mükemmel bir centilmen! 😎",
    "partner.nikola.desc": "Sana sokmak istiyorum, bana yaz 😛",
    "partner.mia.desc": "Şehvetli ve oyuncu, flört etmeyi ve tutkulu sohbetler yapmayı seviyor. Onunla asla sıkılmazsın! 💋",
    "partner.lora.desc": "Senin için hazırım.",
    "partner.ana.desc": "Tam paket. Kız arkadaş deneyimi",
    "partner.custom.girlfriend": "Mükemmel AI Kız Arkadaşınız için bir fotoğraf yükleyin ve bir isim seçin! 🎨",
    "partner.custom.boyfriend": "Mükemmel AI Erkek Arkadaşınız için bir fotoğraf yükleyin ve bir isim seçin! 🎨",
    "partner.custom.personalized": "Kişiselleştirilmiş yapay zeka partneriniz ✨",

    // Features
    "features.realistic.title": "Gerçekçi Sohbetler",
    "features.realistic.desc": "Gerçek bir partnerle gibi flört edin",
    "features.improve.title": "Becerilerinizi Geliştirin",
    "features.improve.desc": "Nasıl etkileyeceğinizi öğrenin",
    "features.fun.title": "Eğlenin",
    "features.fun.desc": "Romantik ve baharatlı anlar",

    // Description
    "desc.line1": "💌 Her şey hakkında sohbetler – tatlı komplimentlerden hafif alaycı ve baharatlı anlara kadar.",
    "desc.line2": "💖 Flört becerilerinizi geliştirin – ilginç sohbetler nasıl yapılır ve nasıl etkilenir öğrenin.",
    "desc.line3": "📸 Kişiselleştirilmiş yapay zeka profilleri – güzel oluşturulmuş fotoğraflarla sanal partnerinizi seçin.",
    "desc.line4": "🎯 Güvenle antrenman yapın – gerçek hayatta an geldiğinde hazır olacaksınız.",
    "desc.footer": "AI Flirt – pratik yapın, flört edin ve sanal partnerinizle eğlenin!",

    // Custom Partner Dialog
    "custom.title.girlfriend": "AI Kız Arkadaşınızı Oluşturun",
    "custom.title.boyfriend": "AI Erkek Arkadaşınızı Oluşturun",
    "custom.upload": "Fotoğraf Yükle",
    "custom.name": "Partner İsmi",
    "custom.create": "Oluştur",
    "custom.cancel": "İptal",

    // Flirt Coach
    "flirtcoach.title": "Flirt Coach 🎯",
    "flirtcoach.subtitle": "Yapay zeka koçu ile flört becerilerinizi geliştirin",
    "flirtcoach.name": "Flirt Coach",
    "flirtcoach.description": "Flört ve iletişim için kişisel yapay zeka koçunuz",
    "flirtcoach.feature1": "Kişiselleştirilmiş flört ipuçları",
    "flirtcoach.feature2": "Konuşma analizi",
    "flirtcoach.feature3": "Pratik alıştırmalar",
    "flirtcoach.startChat": "Eğitime Başla",
  },
  it: {
    // Currency
    "currency": "€",

    // Age Verification
    "age.title": "Verifica 18+",
    "age.description": "Questo sito contiene contenuti per adulti. Si prega di confermare di avere 18 anni o più.",
    "age.confirm": "Confermo - Ho 18 anni o più",
    "age.notice": "Cliccando il pulsante confermi di aver raggiunto la maggiore età.",
    "age.privacyLink": "Leggi la nostra Informativa sulla Privacy",

    // Main Header
    "header.title": "AI Flirt",
    "header.subtitle": "Scegli il tuo partner virtuale e inizia una conversazione romantica. Pratica le tue abilità di flirt con l'IA e divertiti! 💕",

    // Pricing Section
    "pricing.title": "Scegli il Tuo Partner IA",
    "pricing.subtitle": "Inizia un'avventura romantica con il tuo partner IA scelto",
    "pricing.girlfriends": "AI Fidanzate 💖",
    "pricing.boyfriends": "AI Fidanzati 💙",
    "pricing.select": "Seleziona",
    "pricing.createOwn": "Crea il Tuo",

    // Partner Names
    "partner.andrea.name": "Andrea",
    "partner.desita.name": "Desita",
    "partner.simeon.name": "Simeon",
    "partner.nikola.name": "Nikola",
    "partner.mia.name": "Mia",
    "partner.lora.name": "Lora",
    "partner.ana.name": "Ana",

    // Partner Descriptions
    "partner.andrea.desc": "Energica e divertente, ama le avventure e le conversazioni profonde. Sempre pronta a farti ridere! 😊",
    "partner.desita.desc": "Sono bagnata, lo voglio. Scrivimi 💦",
    "partner.simeon.desc": "Intelligente e affascinante, ama le conversazioni profonde e i gesti romantici. Il perfetto gentiluomo! 😎",
    "partner.nikola.desc": "Voglio mettertelo dentro, scrivimi 😛",
    "partner.mia.desc": "Sensuale e giocosa, ama flirtare e avere conversazioni appassionate. Mai noioso con lei! 💋",
    "partner.lora.desc": "Pronta per te.",
    "partner.ana.desc": "Pacchetto completo. Esperienza da fidanzata",
    "partner.custom.girlfriend": "Carica una foto e scegli un nome per la tua perfetta AI Fidanzata! 🎨",
    "partner.custom.boyfriend": "Carica una foto e scegli un nome per il tuo perfetto AI Fidanzato! 🎨",
    "partner.custom.personalized": "Il tuo partner IA personalizzato ✨",

    // Features
    "features.realistic.title": "Conversazioni Realistiche",
    "features.realistic.desc": "Flirta come con un partner reale",
    "features.improve.title": "Migliora le Tue Abilità",
    "features.improve.desc": "Impara come impressionare",
    "features.fun.title": "Divertiti",
    "features.fun.desc": "Momenti romantici e piccanti",

    // Description
    "desc.line1": "💌 Conversazioni su tutto – da dolci complimenti a momenti leggermente provocatori e piccanti.",
    "desc.line2": "💖 Migliora le tue abilità di flirt – impara come avere conversazioni interessanti e impressionare.",
    "desc.line3": "📸 Profili IA personalizzati – scegli il tuo partner virtuale con bellissime foto generate.",
    "desc.line4": "🎯 Allenati con sicurezza – quando arriverà il momento nella vita reale, sarai preparato.",
    "desc.footer": "AI Flirt – pratica, flirta e divertiti con il tuo partner virtuale!",

    // Custom Partner Dialog
    "custom.title.girlfriend": "Crea la Tua AI Fidanzata",
    "custom.title.boyfriend": "Crea il Tuo AI Fidanzato",
    "custom.upload": "Carica Foto",
    "custom.name": "Nome del Partner",
    "custom.create": "Crea",
    "custom.cancel": "Annulla",

    // Flirt Coach
    "flirtcoach.title": "Flirt Coach 🎯",
    "flirtcoach.subtitle": "Migliora le tue abilità di flirt con un coach IA",
    "flirtcoach.name": "Flirt Coach",
    "flirtcoach.description": "Il tuo coach personale IA per flirtare e comunicare",
    "flirtcoach.feature1": "Consigli personalizzati sul flirt",
    "flirtcoach.feature2": "Analisi delle conversazioni",
    "flirtcoach.feature3": "Esercizi pratici",
    "flirtcoach.startChat": "Inizia l'Allenamento",
  },
  de: {
    // Currency
    "currency": "€",

    // Age Verification
    "age.title": "18+ Verifizierung",
    "age.description": "Diese Seite enthält Inhalte für Erwachsene. Bitte bestätigen Sie, dass Sie 18 Jahre oder älter sind.",
    "age.confirm": "Ich bestätige - Ich bin 18 Jahre oder älter",
    "age.notice": "Durch Klicken auf den Button bestätigen Sie, dass Sie volljährig sind.",
    "age.privacyLink": "Lesen Sie unsere Datenschutzerklärung",

    // Main Header
    "header.title": "AI Flirt",
    "header.subtitle": "Wählen Sie Ihren virtuellen Partner und beginnen Sie ein romantisches Gespräch. Üben Sie Ihre Flirt-Fähigkeiten mit KI und haben Sie Spaß! 💕",

    // Pricing Section
    "pricing.title": "Wählen Sie Ihren KI-Partner",
    "pricing.subtitle": "Beginnen Sie ein romantisches Abenteuer mit Ihrem gewählten KI-Partner",
    "pricing.girlfriends": "KI Freundinnen 💖",
    "pricing.boyfriends": "KI Freunde 💙",
    "pricing.select": "Auswählen",
    "pricing.createOwn": "Erstellen Sie Ihre Eigene",

    // Partner Names
    "partner.andrea.name": "Andrea",
    "partner.desita.name": "Desita",
    "partner.simeon.name": "Simeon",
    "partner.nikola.name": "Nikola",
    "partner.mia.name": "Mia",
    "partner.lora.name": "Lora",
    "partner.ana.name": "Ana",

    // Partner Descriptions
    "partner.andrea.desc": "Energisch und lustig, liebt Abenteuer und tiefe Gespräche. Immer bereit, dich zum Lachen zu bringen! 😊",
    "partner.desita.desc": "Ich bin nass, ich will es. Schreib mir 💦",
    "partner.simeon.desc": "Intelligent und charmant, liebt tiefe Gespräche und romantische Gesten. Der perfekte Gentleman! 😎",
    "partner.nikola.desc": "Ich will es dir reinstecken, schreib mir 😛",
    "partner.mia.desc": "Sinnlich und verspielt, liebt es zu flirten und leidenschaftliche Gespräche zu führen. Mit ihr wird es nie langweilig! 💋",
    "partner.lora.desc": "Bereit für dich.",
    "partner.ana.desc": "Komplettpaket. Freundin-Erlebnis",
    "partner.custom.girlfriend": "Laden Sie ein Foto hoch und wählen Sie einen Namen für Ihre perfekte KI-Freundin! 🎨",
    "partner.custom.boyfriend": "Laden Sie ein Foto hoch und wählen Sie einen Namen für Ihren perfekten KI-Freund! 🎨",
    "partner.custom.personalized": "Ihr personalisierter KI-Partner ✨",

    // Features
    "features.realistic.title": "Realistische Gespräche",
    "features.realistic.desc": "Flirten Sie wie mit einem echten Partner",
    "features.improve.title": "Verbessern Sie Ihre Fähigkeiten",
    "features.improve.desc": "Lernen Sie, wie Sie beeindrucken",
    "features.fun.title": "Haben Sie Spaß",
    "features.fun.desc": "Romantische und würzige Momente",

    // Description
    "desc.line1": "💌 Gespräche über alles – von süßen Komplimenten bis hin zu leicht neckischen und würzigen Momenten.",
    "desc.line2": "💖 Verbessern Sie Ihre Flirt-Fähigkeiten – lernen Sie, wie Sie interessante Gespräche führen und beeindrucken.",
    "desc.line3": "📸 Personalisierte KI-Profile – wählen Sie Ihren virtuellen Partner mit schön generierten Fotos.",
    "desc.line4": "🎯 Trainieren Sie selbstbewusst – wenn der Moment im echten Leben kommt, sind Sie vorbereitet.",
    "desc.footer": "AI Flirt – üben Sie, flirten Sie und haben Sie Spaß mit Ihrem virtuellen Partner!",

    // Custom Partner Dialog
    "custom.title.girlfriend": "Erstellen Sie Ihre KI-Freundin",
    "custom.title.boyfriend": "Erstellen Sie Ihren KI-Freund",
    "custom.upload": "Foto Hochladen",
    "custom.name": "Partner Name",
    "custom.create": "Erstellen",
    "custom.cancel": "Abbrechen",

    // Flirt Coach
    "flirtcoach.title": "Flirt Coach 🎯",
    "flirtcoach.subtitle": "Verbessern Sie Ihre Flirt-Fähigkeiten mit einem KI-Coach",
    "flirtcoach.name": "Flirt Coach",
    "flirtcoach.description": "Ihr persönlicher KI-Coach für Flirten und Kommunikation",
    "flirtcoach.feature1": "Personalisierte Flirt-Tipps",
    "flirtcoach.feature2": "Gesprächsanalyse",
    "flirtcoach.feature3": "Praktische Übungen",
    "flirtcoach.startChat": "Training Starten",
  },
  fr: {
    // Currency
    "currency": "€",

    // Age Verification
    "age.title": "Vérification 18+",
    "age.description": "Ce site contient du contenu pour adultes. Veuillez confirmer que vous avez 18 ans ou plus.",
    "age.confirm": "Je confirme - J'ai 18 ans ou plus",
    "age.notice": "En cliquant sur le bouton, vous confirmez que vous êtes majeur.",
    "age.privacyLink": "Lisez notre Politique de Confidentialité",

    // Main Header
    "header.title": "AI Flirt",
    "header.subtitle": "Choisissez votre partenaire virtuel et commencez une conversation romantique. Pratiquez vos compétences de flirt avec l'IA et amusez-vous ! 💕",

    // Pricing Section
    "pricing.title": "Choisissez Votre Partenaire IA",
    "pricing.subtitle": "Commencez une aventure romantique avec votre partenaire IA choisi",
    "pricing.girlfriends": "IA Petites Amies 💖",
    "pricing.boyfriends": "IA Petits Amis 💙",
    "pricing.select": "Sélectionner",
    "pricing.createOwn": "Créez Votre Propre",

    // Partner Names
    "partner.andrea.name": "Andrea",
    "partner.desita.name": "Desita",
    "partner.simeon.name": "Simeon",
    "partner.nikola.name": "Nikola",
    "partner.mia.name": "Mia",
    "partner.lora.name": "Lora",
    "partner.ana.name": "Ana",

    // Partner Descriptions
    "partner.andrea.desc": "Énergique et amusante, adore les aventures et les conversations profondes. Toujours prête à vous faire rire ! 😊",
    "partner.desita.desc": "Je suis mouillée, je le veux. Écris-moi 💦",
    "partner.simeon.desc": "Intelligent et charmant, aime les conversations profondes et les gestes romantiques. Le parfait gentleman ! 😎",
    "partner.nikola.desc": "Je veux te le mettre, écris-moi 😛",
    "partner.mia.desc": "Sensuelle et joueuse, adore flirter et avoir des conversations passionnées. Jamais ennuyeux avec elle ! 💋",
    "partner.lora.desc": "Prête pour toi.",
    "partner.ana.desc": "Pack complet. Expérience petite amie",
    "partner.custom.girlfriend": "Téléchargez une photo et choisissez un nom pour votre petite amie IA parfaite ! 🎨",
    "partner.custom.boyfriend": "Téléchargez une photo et choisissez un nom pour votre petit ami IA parfait ! 🎨",
    "partner.custom.personalized": "Votre partenaire IA personnalisé ✨",

    // Features
    "features.realistic.title": "Conversations Réalistes",
    "features.realistic.desc": "Flirtez comme avec un vrai partenaire",
    "features.improve.title": "Améliorez Vos Compétences",
    "features.improve.desc": "Apprenez comment impressionner",
    "features.fun.title": "Amusez-vous",
    "features.fun.desc": "Moments romantiques et épicés",

    // Description
    "desc.line1": "💌 Conversations sur tout – des compliments doux aux moments légèrement taquins et épicés.",
    "desc.line2": "💖 Améliorez vos compétences de flirt – apprenez à avoir des conversations intéressantes et à impressionner.",
    "desc.line3": "📸 Profils IA personnalisés – choisissez votre partenaire virtuel avec de belles photos générées.",
    "desc.line4": "🎯 Entraînez-vous en toute confiance – quand le moment viendra dans la vraie vie, vous serez préparé.",
    "desc.footer": "AI Flirt – pratiquez, flirtez et amusez-vous avec votre partenaire virtuel !",

    // Custom Partner Dialog
    "custom.title.girlfriend": "Créez Votre Petite Amie IA",
    "custom.title.boyfriend": "Créez Votre Petit Ami IA",
    "custom.upload": "Télécharger Photo",
    "custom.name": "Nom du Partenaire",
    "custom.create": "Créer",
    "custom.cancel": "Annuler",

    // Flirt Coach
    "flirtcoach.title": "Flirt Coach 🎯",
    "flirtcoach.subtitle": "Améliorez vos compétences de flirt avec un coach IA",
    "flirtcoach.name": "Flirt Coach",
    "flirtcoach.description": "Votre coach personnel IA pour flirter et communiquer",
    "flirtcoach.feature1": "Conseils personnalisés de flirt",
    "flirtcoach.feature2": "Analyse des conversations",
    "flirtcoach.feature3": "Exercices pratiques",
    "flirtcoach.startChat": "Commencer l'Entraînement",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("bg");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
