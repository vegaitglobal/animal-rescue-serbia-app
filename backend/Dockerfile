#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

RUN mkdir uploads

ENV ASPNETCORE_URLS=http://*:5113
ENV WebRootPath "/app/uploads"


FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY *.sln ./
COPY ["AnimalRescue.Api/AnimalRescue.Api.csproj", "AnimalRescue.Api/"]
COPY ["AnimalRescue.Application/AnimalRescue.Application.csproj", "AnimalRescue.Application/"]
COPY ["AnimalRescue.DataAccess/AnimalRescue.DataAccess.csproj", "AnimalRescue.DataAccess/"]
COPY ["AnimalRescue.Domain/AnimalRescue.Domain.csproj", "AnimalRescue.Domain/"]
COPY ["AnimalRescue.Contracts/AnimalRescue.Contracts.csproj", "AnimalRescue.Contracts/"]
COPY ["AnimalRescue.HtmlTemplates/AnimalRescue.HtmlTemplates.csproj", "AnimalRescue.HtmlTemplates/"]
RUN dotnet restore
COPY . .

WORKDIR "/src/AnimalRescue.Api/"

RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

EXPOSE 5113
ENTRYPOINT ["dotnet", "AnimalRescue.Api.dll"]

