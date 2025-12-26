# Forum Kırıkkale
Kırıkkale için geliştirilen, Clean Architecture prensiplerine uygun forum uygulaması. .NET Core tabanlı backend mimarisi.

## Proje Hakkında

Forum Kırıkkale, Kırıkkale'deki herkesin bilgi paylaşımı yapabileceği, soru sorup cevaplayabileceği ve etkileşim kurabileceği bir forum platformu olarak geliştirilmiştir. Proje, modern yazılım geliştirme yaklaşımları dikkate alınarak **Clean Architecture** prensiplerine uygun şekilde tasarlanmıştır.

Bu yapı sayesinde uygulama; sürdürülebilir, test edilebilir ve ölçeklenebilir bir mimariye sahiptir. Proje, akademik gereksinimler ve gerçek dünya yazılım geliştirme pratikleri göz önünde bulundurularak hazırlanmıştır.

## Kullanılan Teknolojiler

* **ASP.NET Core** – Backend geliştirme
* **C#** – Ana programlama dili
* **Clean Architecture** – Katmanlı mimari yaklaşımı
* **Entity Framework Core** – ORM aracı
* **SQL Server** – Veritabanı yönetimi
* **MediatR** – CQRS sağlamak için
* **Generic Repository Pattern** – Veri erişim katmanı soyutlaması

## Mimari Yapı

Proje, Clean Architecture yaklaşımına uygun olarak aşağıdaki katmanlardan oluşmaktadır:

* **Domain Layer**
  Uygulamanın iş kurallarını ve temel varlıklarını (Entities, DTOs, Interfaces) içerir. Bu katman, diğer katmanlardan bağımsızdır.

* **Application Layer**
  İş mantığı, use-case’ler, servisler ve MediatR komut/sorgu yapıları bu katmanda yer alır.

* **Infrastructure Layer**
  Veritabanı işlemleri, repository implementasyonları ve dış bağımlılıklar bu katmanda yönetilir.

* **Presentation (API) Layer**
  Kullanıcıdan gelen HTTP isteklerini karşılayan Controller yapıları bu katmanda bulunur.

## Temel Özellikler

* Kullanıcı kayıt ve giriş işlemleri
* Forum başlıkları (topic) oluşturma
* Gönderi (entry) ekleme, silme ve listeleme
* Katmanlı ve modüler mimari
* Genişletilebilir altyapı

## Amaç ve Kazanımlar

Bu projenin amacı;

* Clean Architecture yapısını gerçek bir projede uygulamak
* Katmanlı mimari ve tasarım desenleri konusunda deneyim kazanmak
* ASP.NET Core ve modern backend teknolojilerini etkin kullanmak
* Üniversite düzeyinde sürdürülebilir bir yazılım projesi geliştirmektir

## Geliştirici

**Sultan Köşmen**
Kırıkkale Üniversitesi – Bilgisayar Mühendisliği (4. Sınıf)

---
