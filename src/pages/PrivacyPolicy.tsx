import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const contentBG = (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-foreground mb-6">Политика за поверителност</h1>
      
      <p className="text-muted-foreground">Последна актуализация: {new Date().toLocaleDateString('bg-BG')}</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">1. Въведение</h2>
        <p className="text-foreground leading-relaxed">
          AI Flirt ("ние", "нас", "наш") управлява уебсайта ai-flirtbg.com. Тази Политика за поверителност 
          обяснява как събираме, използваме, съхраняваме и защитаваме вашата лична информация в съответствие 
          с Общия регламент за защита на данните (GDPR), българското законодателство и международните стандарти 
          за поверителност.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">2. Администратор на лични данни</h2>
        <p className="text-foreground leading-relaxed">
          Администратор на лични данни е:<br/>
          AI Flirt<br/>
          Имейл: support@ai-flirtbg.com<br/>
          Уебсайт: ai-flirtbg.com
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">3. Каква информация събираме</h2>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground">3.1 Информация, която предоставяте:</h3>
          <ul className="list-disc pl-6 space-y-2 text-foreground">
            <li>Имейл адрес и парола при регистрация</li>
            <li>Съдържание на чат съобщения с AI партньори</li>
            <li>Информация за плащания (обработвана чрез Stripe)</li>
            <li>Предпочитания и настройки на профила</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mt-4">3.2 Автоматично събрана информация:</h3>
          <ul className="list-disc pl-6 space-y-2 text-foreground">
            <li>IP адрес и местоположение</li>
            <li>Тип на браузър и операционна система</li>
            <li>Данни за използване на сайта и взаимодействия</li>
            <li>Бисквитки и подобни технологии за проследяване</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">4. Как използваме вашата информация</h2>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>Предоставяне и подобряване на AI чат услугите</li>
          <li>Персонализиране на вашето потребителско изживяване</li>
          <li>Обработка на плащания и управление на абонаменти</li>
          <li>Изпращане на важни известия и актуализации</li>
          <li>Анализ на използването за подобряване на услугите</li>
          <li>Спазване на правни задължения</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">5. Правно основание за обработка (GDPR)</h2>
        <p className="text-foreground leading-relaxed">
          Обработваме вашите данни на следните основания:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li><strong>Договор:</strong> За предоставяне на услугите, за които сте се абонирали</li>
          <li><strong>Съгласие:</strong> За използване на бисквитки и маркетингови комуникации</li>
          <li><strong>Законен интерес:</strong> За подобряване на услугите и предотвратяване на измами</li>
          <li><strong>Правно задължение:</strong> За спазване на приложимото законодателство</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">6. Споделяне на информация</h2>
        <p className="text-foreground leading-relaxed">
          Ние НЕ продаваме вашата лична информация. Споделяме данни само с:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li><strong>Доставчици на услуги:</strong> Stripe (плащания), Supabase (хостинг и база данни)</li>
          <li><strong>AI доставчици:</strong> За обработка на чат съобщения (анонимизирани, когато е възможно)</li>
          <li><strong>Правни органи:</strong> Когато е изискано от закона</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">7. Вашите права (GDPR)</h2>
        <p className="text-foreground leading-relaxed">Имате право да:</p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li><strong>Достъп:</strong> Поискайте копие от вашите лични данни</li>
          <li><strong>Коригиране:</strong> Актуализирайте неточна или непълна информация</li>
          <li><strong>Изтриване:</strong> Поискайте изтриване на вашите данни ("право да бъдете забравени")</li>
          <li><strong>Ограничаване:</strong> Ограничете обработката при определени условия</li>
          <li><strong>Преносимост:</strong> Получете вашите данни в структуриран формат</li>
          <li><strong>Възражение:</strong> Възразите срещу обработка, основана на законен интерес</li>
          <li><strong>Оттегляне на съгласие:</strong> Оттеглете съгласието си по всяко време</li>
        </ul>
        <p className="text-foreground leading-relaxed mt-4">
          За упражняване на вашите права, свържете се с нас на: support@ai-flirtbg.com
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">8. Съхранение на данни</h2>
        <p className="text-foreground leading-relaxed">
          Съхраняваме вашите данни докато вашият акаунт е активен или докато е необходимо за предоставяне на услуги. 
          След заявка за изтриване, анонимизираме или изтриваме данните в рамките на 30 дни, освен ако не сме 
          задължени да ги съхраняваме по закон.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">9. Сигурност на данните</h2>
        <p className="text-foreground leading-relaxed">
          Прилагаме индустриални стандарти за сигурност, включително:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>SSL/TLS криптиране за предаване на данни</li>
          <li>Криптирани бази данни</li>
          <li>Редовни одити за сигурност</li>
          <li>Ограничен достъп само за оторизиран персонал</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">10. Бисквитки и технологии за проследяване</h2>
        <p className="text-foreground leading-relaxed">
          Използваме бисквитки за функционалност, анализ и персонализация. Можете да управлявате бисквитките 
          чрез банера за съгласие или настройките на браузъра си.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li><strong>Необходими бисквитки:</strong> Задължителни за функциониране на сайта</li>
          <li><strong>Аналитични бисквитки:</strong> Помагат ни да разберем използването на сайта</li>
          <li><strong>Функционални бисквитки:</strong> Запомнят вашите предпочитания</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">11. Деца и възрастови</h2>
        <p className="text-foreground leading-relaxed">
          AI Flirt е предназначен само за лица на 18 и повече години. Не събираме съзнателно информация от лица под 18 години. 
          Ако научим, че сме събрали данни от непълнолетно лице, ще ги изтрием незабавно.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">12. Международни трансфери</h2>
        <p className="text-foreground leading-relaxed">
          Вашите данни могат да бъдат обработвани на сървъри в ЕС и САЩ. Гарантираме адекватна защита чрез 
          стандартни договорни клаузи и съответствие с GDPR.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">13. Промени в политиката</h2>
        <p className="text-foreground leading-relaxed">
          Можем да актуализираме тази политика периодично. Ще ви уведомим за съществени промени чрез имейл 
          или известие на сайта.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">14. Контакт</h2>
        <p className="text-foreground leading-relaxed">
          За въпроси относно тази политика или вашите данни:<br/>
          Имейл: support@ai-flirtbg.com<br/>
          Можете също да подадете жалба до Комисията за защита на личните данни (КЗЛД) в България.
        </p>
      </section>
    </div>
  );

  const contentEN = (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-foreground mb-6">Privacy Policy</h1>
      
      <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString('en-US')}</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
        <p className="text-foreground leading-relaxed">
          AI Flirt ("we", "us", "our") operates the website ai-flirtbg.com. This Privacy Policy explains 
          how we collect, use, store, and protect your personal information in accordance with the General 
          Data Protection Regulation (GDPR), Bulgarian legislation, and international privacy standards.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">2. Data Controller</h2>
        <p className="text-foreground leading-relaxed">
          The data controller is:<br/>
          AI Flirt<br/>
          Email: support@ai-flirtbg.com<br/>
          Website: ai-flirtbg.com
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">3. What Information We Collect</h2>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground">3.1 Information you provide:</h3>
          <ul className="list-disc pl-6 space-y-2 text-foreground">
            <li>Email address and password upon registration</li>
            <li>Chat message content with AI partners</li>
            <li>Payment information (processed through Stripe)</li>
            <li>Profile preferences and settings</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mt-4">3.2 Automatically collected information:</h3>
          <ul className="list-disc pl-6 space-y-2 text-foreground">
            <li>IP address and location</li>
            <li>Browser type and operating system</li>
            <li>Site usage data and interactions</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">4. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>Provide and improve AI chat services</li>
          <li>Personalize your user experience</li>
          <li>Process payments and manage subscriptions</li>
          <li>Send important notifications and updates</li>
          <li>Analyze usage to improve services</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">5. Legal Basis for Processing (GDPR)</h2>
        <p className="text-foreground leading-relaxed">
          We process your data on the following grounds:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li><strong>Contract:</strong> To provide the services you subscribed to</li>
          <li><strong>Consent:</strong> For cookies and marketing communications</li>
          <li><strong>Legitimate Interest:</strong> To improve services and prevent fraud</li>
          <li><strong>Legal Obligation:</strong> To comply with applicable law</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">6. Information Sharing</h2>
        <p className="text-foreground leading-relaxed">
          We DO NOT sell your personal information. We only share data with:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li><strong>Service Providers:</strong> Stripe (payments), Supabase (hosting and database)</li>
          <li><strong>AI Providers:</strong> For processing chat messages (anonymized when possible)</li>
          <li><strong>Legal Authorities:</strong> When required by law</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">7. Your Rights (GDPR)</h2>
        <p className="text-foreground leading-relaxed">You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li><strong>Access:</strong> Request a copy of your personal data</li>
          <li><strong>Rectification:</strong> Update inaccurate or incomplete information</li>
          <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
          <li><strong>Restriction:</strong> Limit processing under certain conditions</li>
          <li><strong>Portability:</strong> Receive your data in a structured format</li>
          <li><strong>Object:</strong> Object to processing based on legitimate interest</li>
          <li><strong>Withdraw Consent:</strong> Withdraw your consent at any time</li>
        </ul>
        <p className="text-foreground leading-relaxed mt-4">
          To exercise your rights, contact us at: support@ai-flirtbg.com
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">8. Data Retention</h2>
        <p className="text-foreground leading-relaxed">
          We retain your data while your account is active or as needed to provide services. 
          After a deletion request, we anonymize or delete data within 30 days unless legally required to retain it.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">9. Data Security</h2>
        <p className="text-foreground leading-relaxed">
          We implement industry-standard security measures, including:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>SSL/TLS encryption for data transmission</li>
          <li>Encrypted databases</li>
          <li>Regular security audits</li>
          <li>Limited access for authorized personnel only</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">10. Cookies and Tracking Technologies</h2>
        <p className="text-foreground leading-relaxed">
          We use cookies for functionality, analytics, and personalization. You can manage cookies 
          through our consent banner or browser settings.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li><strong>Essential Cookies:</strong> Required for site functionality</li>
          <li><strong>Analytics Cookies:</strong> Help us understand site usage</li>
          <li><strong>Functional Cookies:</strong> Remember your preferences</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">11. Children and Age Requirements</h2>
        <p className="text-foreground leading-relaxed">
          AI Flirt is intended only for individuals 18 years or older. We do not knowingly collect information 
          from individuals under 18. If we learn we have collected data from a minor, we will delete it immediately.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">12. International Transfers</h2>
        <p className="text-foreground leading-relaxed">
          Your data may be processed on servers in the EU and US. We ensure adequate protection through 
          standard contractual clauses and GDPR compliance.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">13. Policy Changes</h2>
        <p className="text-foreground leading-relaxed">
          We may update this policy periodically. We will notify you of significant changes via email 
          or site notice.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">14. Contact</h2>
        <p className="text-foreground leading-relaxed">
          For questions about this policy or your data:<br/>
          Email: support@ai-flirtbg.com<br/>
          You may also file a complaint with the Commission for Personal Data Protection (CPDP) in Bulgaria.
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

export default PrivacyPolicy;
