import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const contentBG = (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-foreground mb-6">Условия за ползване</h1>
      
      <p className="text-muted-foreground">Последна актуализация: {new Date().toLocaleDateString('bg-BG')}</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">1. Приемане на условията</h2>
        <p className="text-foreground leading-relaxed">
          Като използвате AI Flirt (ai-flirtbg.com), вие приемате да спазвате тези Условия за ползване. 
          Ако не сте съгласни с някое от условията, моля не използвайте нашите услуги.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">2. Възрастово ограничение</h2>
        <p className="text-foreground leading-relaxed">
          Трябва да сте навършили 18 години, за да използвате AI Flirt. Използвайки услугите, потвърждавате, 
          че сте навършили пълнолетие съгласно законодателството във вашата юрисдикция.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">3. Описание на услугата</h2>
        <p className="text-foreground leading-relaxed">
          AI Flirt предоставя AI-базирани чат услуги с виртуални партньори за развлечение и социално взаимодействие. 
          Услугата използва изкуствен интелект за генериране на разговори и не включва реални хора.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">4. Акаунти и регистрация</h2>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>Трябва да предоставите точна и пълна информация при регистрация</li>
          <li>Отговорни сте за сигурността на вашата парола</li>
          <li>Не можете да споделяте или прехвърляте вашия акаунт на други лица</li>
          <li>Трябва незабавно да ни уведомите за неоторизиран достъп</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">5. Допустимо използване</h2>
        <p className="text-foreground leading-relaxed">Вие се съгласявате да НЕ:</p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>Използвате услугата за незаконни цели</li>
          <li>Опитвате да нарушите сигурността на платформата</li>
          <li>Препродавате или комерсиализирате достъпа без разрешение</li>
          <li>Използвате автоматизирани системи (ботове) без одобрение</li>
          <li>Тормозите, заплашвате или обиждате други потребители</li>
          <li>Качвате злонамерен софтуер или вируси</li>
          <li>Нарушавате авторски права или права на интелектуална собственост</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">6. Абонаменти и плащания</h2>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>Плащанията се обработват сигурно чрез Stripe</li>
          <li>Абонаментите се подновяват автоматично освен ако не ги анулирате</li>
          <li>Цените могат да се променят с предварително уведомление</li>
          <li>Възстановявания се предоставят съгласно нашата политика за възстановяване</li>
          <li>Имате право да анулирате абонамента си по всяко време</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">7. Съдържание, генерирано от AI</h2>
        <p className="text-foreground leading-relaxed">
          AI Flirt използва AI модели за генериране на разговори. Въпреки че полагаме усилия за качество:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>AI може понякога да генерира неточно или неподходящо съдържание</li>
          <li>Не гарантираме пълна точност на AI отговорите</li>
          <li>AI не предоставя професионални съвети (медицински, правни, финансови)</li>
          <li>Всички взаимодействия са със симулирани личности, не реални хора</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">8. Интелектуална собственост</h2>
        <p className="text-foreground leading-relaxed">
          AI Flirt и неговото съдържание (текстове, графики, логота, AI модели) са собственост на AI Flirt 
          или нейните лицензодатели. Вие получавате ограничена, неизключителна лицензия за използване на услугата 
          за лични, некомерсиални цели.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">9. Поверителност</h2>
        <p className="text-foreground leading-relaxed">
          Вашата поверителност е важна за нас. Моля, прегледайте нашата <a href="/privacy-policy" className="text-primary hover:underline">Политика за поверителност</a>, 
          която обяснява как събираме, използваме и защитаваме вашите данни.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">10. Прекратяване</h2>
        <p className="text-foreground leading-relaxed">
          Запазваме правото да прекратим или суспендираме вашия достъп незабавно, без предизвестие, 
          ако нарушите тези условия или ако считаме, че вашите действия застрашават сигурността на услугата.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">11. Отказ от гаранции</h2>
        <p className="text-foreground leading-relaxed">
          AI Flirt се предоставя "КАКТО Е" и "КАКТО Е НАЛИЧНА". Ние не гарантираме, че услугата ще бъде 
          безпрекъсна, сигурна или без грешки. Не поемаме отговорност за временни прекъсвания или технически проблеми.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">12. Ограничение на отговорността</h2>
        <p className="text-foreground leading-relaxed">
          В максимална степен, разрешена от закона, AI Flirt не носи отговорност за непреки, случайни, 
          специални или последващи щети, произтичащи от използването или невъзможността да използвате услугата.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">13. Обезщетение</h2>
        <p className="text-foreground leading-relaxed">
          Вие се съгласявате да обезщетите и защитите AI Flirt от всякакви искове, загуби или разходи, 
          произтичащи от вашето нарушение на тези условия или вашето използване на услугата.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">14. Приложимо право</h2>
        <p className="text-foreground leading-relaxed">
          Тези условия се уреждат от законите на Република България. Всякакви спорове ще бъдат разрешавани 
          в съответните български съдилища.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">15. Промени в условията</h2>
        <p className="text-foreground leading-relaxed">
          Запазваме правото да променяме тези условия по всяко време. Ще ви уведомим за съществени промени 
          чрез имейл или известие на сайта. Продължаващото използване след промените означава приемане на новите условия.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">16. Контакт</h2>
        <p className="text-foreground leading-relaxed">
          За въпроси относно тези условия:<br/>
          Имейл: support@ai-flirtbg.com<br/>
          Уебсайт: ai-flirtbg.com
        </p>
      </section>
    </div>
  );

  const contentEN = (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-foreground mb-6">Terms of Service</h1>
      
      <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString('en-US')}</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
        <p className="text-foreground leading-relaxed">
          By using AI Flirt (ai-flirtbg.com), you agree to abide by these Terms of Service. 
          If you disagree with any part of the terms, please do not use our services.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">2. Age Restriction</h2>
        <p className="text-foreground leading-relaxed">
          You must be 18 years or older to use AI Flirt. By using the services, you confirm that you have 
          reached the age of majority according to the laws in your jurisdiction.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">3. Service Description</h2>
        <p className="text-foreground leading-relaxed">
          AI Flirt provides AI-based chat services with virtual partners for entertainment and social interaction. 
          The service uses artificial intelligence to generate conversations and does not involve real people.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">4. Accounts and Registration</h2>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>You must provide accurate and complete information during registration</li>
          <li>You are responsible for the security of your password</li>
          <li>You may not share or transfer your account to others</li>
          <li>You must notify us immediately of unauthorized access</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">5. Acceptable Use</h2>
        <p className="text-foreground leading-relaxed">You agree NOT to:</p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>Use the service for illegal purposes</li>
          <li>Attempt to breach the platform's security</li>
          <li>Resell or commercialize access without permission</li>
          <li>Use automated systems (bots) without approval</li>
          <li>Harass, threaten, or insult other users</li>
          <li>Upload malicious software or viruses</li>
          <li>Violate copyrights or intellectual property rights</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">6. Subscriptions and Payments</h2>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>Payments are securely processed through Stripe</li>
          <li>Subscriptions auto-renew unless you cancel</li>
          <li>Prices may change with advance notice</li>
          <li>Refunds are provided according to our refund policy</li>
          <li>You have the right to cancel your subscription at any time</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">7. AI-Generated Content</h2>
        <p className="text-foreground leading-relaxed">
          AI Flirt uses AI models to generate conversations. While we strive for quality:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>AI may occasionally generate inaccurate or inappropriate content</li>
          <li>We do not guarantee complete accuracy of AI responses</li>
          <li>AI does not provide professional advice (medical, legal, financial)</li>
          <li>All interactions are with simulated personalities, not real people</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">8. Intellectual Property</h2>
        <p className="text-foreground leading-relaxed">
          AI Flirt and its content (text, graphics, logos, AI models) are owned by AI Flirt or its licensors. 
          You receive a limited, non-exclusive license to use the service for personal, non-commercial purposes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">9. Privacy</h2>
        <p className="text-foreground leading-relaxed">
          Your privacy is important to us. Please review our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>, 
          which explains how we collect, use, and protect your data.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">10. Termination</h2>
        <p className="text-foreground leading-relaxed">
          We reserve the right to terminate or suspend your access immediately, without notice, 
          if you violate these terms or if we believe your actions endanger the service's security.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">11. Disclaimer of Warranties</h2>
        <p className="text-foreground leading-relaxed">
          AI Flirt is provided "AS IS" and "AS AVAILABLE". We do not guarantee that the service will be 
          uninterrupted, secure, or error-free. We are not responsible for temporary disruptions or technical issues.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">12. Limitation of Liability</h2>
        <p className="text-foreground leading-relaxed">
          To the maximum extent permitted by law, AI Flirt is not liable for indirect, incidental, special, 
          or consequential damages arising from using or being unable to use the service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">13. Indemnification</h2>
        <p className="text-foreground leading-relaxed">
          You agree to indemnify and hold harmless AI Flirt from any claims, losses, or expenses arising 
          from your violation of these terms or your use of the service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">14. Governing Law</h2>
        <p className="text-foreground leading-relaxed">
          These terms are governed by the laws of the Republic of Bulgaria. Any disputes will be resolved 
          in the appropriate Bulgarian courts.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">15. Changes to Terms</h2>
        <p className="text-foreground leading-relaxed">
          We reserve the right to modify these terms at any time. We will notify you of significant changes 
          via email or site notice. Continued use after changes means acceptance of the new terms.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">16. Contact</h2>
        <p className="text-foreground leading-relaxed">
          For questions about these terms:<br/>
          Email: support@ai-flirtbg.com<br/>
          Website: ai-flirtbg.com
        </p>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen gradient-soft py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === "bg" ? "Назад" : "Back"}
        </Button>
        
        <Card className="p-8">
          {language === "bg" ? contentBG : contentEN}
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
