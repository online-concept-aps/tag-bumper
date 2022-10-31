FROM ubuntu
COPY /script.sh /script.sh
RUN chmod +x /script.sh
ENTRYPOINT [ "/script.sh" ]


FROM mcr.microsoft.com/dotnet/sdk:6.0 as builder
COPY /src /app
RUN dotnet publish -c Release -o /out /app/Container.csproj 
COPY script.sh /out/script.sh

FROM mcr.microsoft.com/dotnet/runtime:6.0 as base
COPY --from=builder /out /app
RUN chmod +x /app/script.sh 