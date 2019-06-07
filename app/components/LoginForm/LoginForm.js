import strings from "./strings";
import styles from "./styles";
import { strings as loginStrings } from "../../screens/Login";
import React, { Component } from "react";
import { View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import { NavigationScreenProp } from "react-navigation";
import { Formik, FormikProps, FormikActions } from "formik";
import { object as yupObject, string as yupString } from "yup";
import deviceStorage from '../../src/services/deviceStorage';

interface FormValues{

  email :string ;
  password : string ;

}
interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default class LoginForm extends Component<Props, object> {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: ""
      };
  };

  handleConnection = (token, values, formikBag: FormikActions<FormValues>) =>{
    //console.warn(response[0]);
    if(token.length > 0 ){

      this.setState({ email : values.email });
      this.setState({ password : values.password });
      deviceStorage.saveItem("id_token", token);


      setTimeout(() => {
        formikBag.setSubmitting(false);
        this.props.navigation.navigate("LoadingScreen");
      }, 1000);

    }
  };

  handleSubmit = (values: FormValues, formikBag: FormikActions<FormValues>) =>
  {
    formikBag.setSubmitting(true);


    //On campus use 192.168.43.73
    //TODO : CONCATENATE IP WITH FULL URL
    fetch('http://192.168.43.73:8000/api/user/signin',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,

        }),
      }
    )
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.auth)
        this.handleConnection(responseJson.accessToken, values, formikBag);

      //If authentification failed
      else{

        Alert.alert(
          'Login problem',
          'Invalid password or email',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },

          ],
          {cancelable: false},
        );
        formikBag.setSubmitting(false);


      }
    })
    .catch((error) => {
      console.error(error);
    });


  };
  renderForm = ({
    values,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    isSubmitting
  }: FormikProps<FormValues>) => (
    <View style={styles.container}>
      <Input
        placeholder={strings.emailAddress}
        keyboardType="email-address"
        autoCapitalize="none"
        value={values.email}
        onChangeText={value => setFieldValue("email", value)}
        onBlur={() => setFieldTouched("email")}
        editable={!isSubmitting}
        errorMessage={touched.email && errors.email ? errors.email : undefined}
      />
      <Input
        placeholder={strings.password}
        secureTextEntry
        autoCapitalize="none"
        value={values.password}
        onChangeText={value => setFieldValue("password", value)}
        onBlur={() => setFieldTouched("password")}
        editable={!isSubmitting}
        errorMessage={touched.password && errors.password ? errors.password : undefined}
      />
      <View style={styles.buttonContainer}>
      <Button
        clear
        title={loginStrings.forgottenPassword}
        containerStyle={styles.forgottenPasswordButtonContainer}
        titleStyle={styles.forgottenPasswordTitle}
        onPress={() => this.props.navigation.navigate("PasswordResetScreen")}
      />
      <Button
        title={loginStrings.loginTitle}
        containerStyle={styles.loginButtonContainer}
        buttonStyle={styles.loginButton}
        disabledStyle={styles.disabled}
        titleStyle={styles.loginButtonTitle}
        disabledTitleStyle={styles.loginButtonTitle}
        onPress={handleSubmit}
        disabled={isSubmitting}
        loading={isSubmitting}
        loadingProps={{ size: "small", color: "white" }}
      />
      </View>

    </View>
  );

  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values: FormValues, formikBag: FormikActions<FormValues>) =>
          this.handleSubmit(values, formikBag)
        }
        validationSchema={yupObject().shape({
          email: yupString()
            .email(strings.invalidEmailFormat)
            .required(strings.emailRequired),
          password: yupString()
            .min(8, strings.passwordMinLength)
            .required(strings.passwordRequired)
        })}
        render={(formikBag: FormikProps<FormValues>) => this.renderForm(formikBag)}
      />
    );
  }
}
