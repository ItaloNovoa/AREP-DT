# Dirección del Trabajo - Chile
Este proyecto es realizado por [Diego Alberto Carvajal Cárdenas](https://github.com/diegocar) , [Italo Orlando Cufiño Novoa](https://github.com/ItaloNovoa) y [Sergio Hernando Ruiz Paez](https://github.com/Sergyo97) para la materia de Arquitectura Empresarial de la Escuela Colombiana de Ingeniería Julio Garavito.

## Introducción
La Dirección de Trabajo de Chile se encuentra trabajando en el proyecto de digitalización de la carta de despido, siendo este el proyecto desde el cual nace la idea de nuestro proyecto que se basa en poder brindarle una continuidad a la información digital que se genera al momento de utilizar la carta de despido de manera digital. La idea principal de la propuesta que se esta brindando es poder brindarles una herramienta a las empresas chilenas, siendo esta un sistema el cual les permita verificar el pasado laboral de un postulante para tener una visión mucho más amplia, verídica y general de la persona que puedan llegar a contratar. Para el producto que nos permite brindar todas las funcionalidades anteriormente mencionadas, se va a contar con una API que esta conectada a una base de datos relacionas en RDS, para poder montar y desplegar el servicio desde AWS y conectarlo a un clúster para permitir el múltiple acceso a nuestro servicio. A lo largo de este informe esta el alcance manejado en este proyecto, la arquitectura utilizada, y también como esta solución puede llegar a cambiar la idea que tiene la Dirección del Trabajo.

## Alcance
Se establece un objetivo principal que se basa en darle una continuidad a la información manejada por el proyecto de digitalización de la carta de despido. Para esto lo que se decidió hacer fue poder brindar un prototipo del sistema el cual en planeación se tiene en cuenta el factor como la clave única que es utilizada en chile, pero que principalmente se encarga de permitir consultar a las empresas el pasado laboral de sus alicantes, así como también modificar el historial laboral de sus trabajadores. Esta propuesta de solución tecnológica esta basada en los principios de API Rest, uso de información privada de cada persona, así como una plataforma que se encuentre descentralizada para un mejor funcionamiento a nivel de escalabilidad. 
Se definen así mismo una serie de entregables para dar por finalizada esta fase del proyecto:
1.	Informe de avances del proyecto.
2.	Repositorio con el prototipo de la solución.
3.	Presentación de negocio de resumen.

## Arquitectura del negocio
En esta sección se describirá el estado actual de la arquitectura de negocio del cliente (Dirección del Trabajo Chile - Proyecto de digitalización de la carta de despido)

### Digitalización de Carta de Despido Online
La primera medida que tomaremos para modernizar el Estado será realizar una completa transformación digital de los certificados que deben presentar los ciudadanos al momento de realizar un trámite. Queremos terminar con la peregrinación del ciudadano de una institución pública a otra para obtener un beneficio. Queremos menos papeleo y más tiempo libre para los chilenos.

La carta de aviso es la comunicación que la ley exige al empleador para dar a conocer al trabajador el término de la relación laboral.

Los principales factores del proyecto de la carta de despido online son:
1. Descongestion de oficina.
2. Veracidad de documento oficial (caso AFC).
3. Interoperabilidad entre organismos publicos y privados.
4. Agilidad del proceso.
5. Disminución de tiempos de respuesta.
6. Reducción de costos en la notificacion del despido (correos)

### Organigrama de la Dirección del Trabajo
![image](https://user-images.githubusercontent.com/36173352/70594069-4dfdeb00-1bad-11ea-8dae-3082b6c9d03a.png)

## Arquitectura de datos y aplicaciones de la organización

La Dirección de Trabajo de Chile usa diferentes aplicaciones para llevar a cabo o soportar todos los procesos de negocio de su arquitectura empresarial. Es importante tener en cuenta que cada una de estas aplicaciones cuenta con un modelo de infraestructura independiente modelado y desplegado dentro de su red interna y que consume de los servicios externos correspondientes cuando es necesario.

 1. Clave Única
Permite a cada dirigente sindical vigente (del sector público y privado) obtener una clave de acceso para efectuar diversos trámites en línea a través de la ventanilla sindical del sitio web de la Dirección del Trabajo (DT). Entre otras solicitudes, los interesados pueden obtener el certificado de composición del directorio, además de acceder al registro de los actos de la organización sindical.

 2. Bolsa Nacional de Empleo
La Bolsa Nacional de Empleo, o BNE, es un sistema informático público que presta el servicio gratuito de intermediación laboral y de certificación de la búsqueda efectiva de empleo para acceder al Fondo de Cesantía Solidario. Su regulación está dada por la Ley N° 19.728 de Seguro de Desempleo.

 3. Microsoft Office 365
Es una solución de arrendamiento del paquete Microsoft Office (Word, Excel, PowerPoint, Publisher, Access, OneNote, Outlook y SharePoint) para su uso durante un año en vez de pagar el precio completo de la adquisición del producto. Aunque se puede pagar el arrendamiento anual completo, es común que se pague a plazos mensuales (se aplican impuestos según el país donde se encuentre).

 4. Chile Atiende
es una red que busca acercar los servicios del Estado a las personas, entregando un conjunto de trámites de diferentes instituciones públicas, en un solo lugar.

## Arquitectura de la solución

![image](https://user-images.githubusercontent.com/36173352/70594520-ba421400-1bd8-11ea-9e7a-fe60364a622a.png)

La arquitectura se compone de una solución de software, basada en un API Rest que consume datos mediante una de capa de aplicación (frontend) desarrollada mediante el framework ReactJS mantenida en un servicio EC2 de AWS, el cuál a su vez retiene los datos y los envía a la capa de persistencia (backend), siendo éste una imagen MIA, servicio de AWS que mediante un balanceador de carga y un grupo de escalamiento que permitedefinir un target de tal manera que sin importar el número de peticiones que sean realizadas hacia o desde él podrán soportarse sin ningún problema, llegando así al último paso dónde ésta información será almacenada en una base de datos no relacional NoSQL con el servicio que provee MongoDB.

## Indicadores clave de la solución para el negocio
![image](https://user-images.githubusercontent.com/36173352/70594757-5c61fc00-1bd9-11ea-8b28-fe4a630ee8a6.png)

Esta seria la estructura preeliminar de costes que se manejaria en la implementación propuesta en esta fase del proyecto.

## Arquitectura de Datos

Para estructurar las solicitudes de añadir o manejar los despidos, se definen las siguientes secciones básicas de cada solicitud, que podrían considerarse como sub-entidades de la entidad:

 1. Registro general de las empresas: En ésta sección la empresa se registra, colocando sus datos esenciales y creando una clave única, la cual será manejada posteriormente por la aplicación de "Clave Única", poniendo en registro la fecha de creación de la cuenta.

 2. Manejo de entidades: De acuerdo a los estatutos legales de la Dirección del Trabajo de Chile, si la empresa es de índole privado o público se verá obligada a manejar el sistema de despedido y automatización de la carta de las mismas de manera distinta, con tiempos y registros del proceso de manera distinta, a lo cuál, la arquitectura de la empresa se ve relacionada.

 3. Registro de una carta de despedido: Mediante la interfaz propuesta para las empresas, es de manera instintiva hacer un registro de la carta de despido, colocando los datos esenciales del empleado sobre el cual se realizará el proceso.

 4. Estado de la aplicación: Una vez los registros se han hecho, la aplicación mediante el modelo de registro en una base de datos, sin importar la fecha, hora o lugar, las empresas tendrán completa disponibilidad sobre los estados de las mismas.
